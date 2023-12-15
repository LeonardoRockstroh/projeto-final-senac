const lancamentoRepository = require('../repository/lancamentoRepository');
const produtosRepository = require('../repository/produtosRepository');
const express = require('express');

module.exports = {
  getLancamentos: (req, res) => {
    res.render('lancamentos', { username: req.session.username });
  },

  getLancarEntrada: (req, res) => {
    res.render('lancar-entrada', { username: req.session.username });
  },

  getLancarSaida: (req, res) => {
    res.render('lancar-saida', { username: req.session.username });
  },

  getRelatorioLancamentos: (req, res) => {
    res.render('relatorioLancamentos', { username: req.session.username });
  },

  postEntrada: async (req, res) => {
    var { prod_name, lanc_qtd, lanc_vencimento } = req.body;
    const entrada = true;
  
    try {
      const produto = await produtosRepository.buscarNome(prod_name);
  
      if (!produto[0]) {
        req.flash('error', 'Produto não encontrado');
        res.render('lancar-entrada', { username: req.session.username, messages: req.flash() });
        return;
      } else {
        const dataAtual = new Date().toISOString().split('T')[0];
        const horaAtual = new Date().toLocaleTimeString();
        const prod_qtd = parseFloat(produto[0].prod_qtd) + parseFloat(lanc_qtd);

        console.log(prod_qtd)
        
        if (!lanc_vencimento) {
          // Não preenchido
          lanc_vencimento = '9999-12-01'
        } else {
          if (lanc_vencimento < dataAtual) {
            eq.flash('error', 'A data de vencimento não pode ser menor que a data atual.');
            res.render('lancar-entrada', { username: req.session.username, messages: req.flash() });
            return;
          }
        }
  
        const dados = await lancamentoRepository.inserirLancamento(
          produto[0].prod_id,
          prod_name,
          lanc_qtd,
          lanc_vencimento,
          entrada,
          dataAtual,
          horaAtual
        );

        const prodQtd = await produtosRepository.atualizarQuantidade(
          produto[0].prod_id,
          prod_qtd
        );
  
        res.render('lancamentos', { username: req.session.username });
      }
    } catch (error) {
      console.error('Erro ao inserir lançamento:', error);
      req.flash('error', 'Erro ao inserir lançamento. Por favor, tente novamente.');
      res.render('lancar-entrada', { username: req.session.username, messages: req.flash() });
    }
  },

  postSaida: async (req, res) => {
    var { prod_name, lanc_qtd, lanc_vencimento } = req.body;
    const entrada = false;
  
    try {
      const produto = await produtosRepository.buscarNome(prod_name);
  
      if (!produto[0]) {
        req.flash('error', 'Produto não encontrado');
        res.render('lancar-saida', { username: req.session.username, messages: req.flash() });
        return;
      } else {
        const dataAtual = new Date().toISOString().split('T')[0];
        const horaAtual = new Date().toLocaleTimeString();

        if (parseFloat(lanc_qtd) > parseFloat(produto[0].prod_qtd)) {
          req.flash('error', 'Quantidade de saída maior que a quantidade disponível.');
          res.render('lancar-saida', { username: req.session.username, messages: req.flash() });
          return;
        }

        if (!lanc_vencimento) {
          // Não preenchido
          lanc_vencimento = '9999-12-01'
        } else {
          if (lanc_vencimento < dataAtual) {
            req.flash('error', 'A data de vencimento não pode ser menor que a data atual.');
            res.render('lancar-entrada', { username: req.session.username, messages: req.flash() });
            return;
          }
        }

        const prod_qtd = parseFloat(produto[0].prod_qtd) - parseFloat(lanc_qtd);
  
        const dados = await lancamentoRepository.inserirLancamento(
          produto[0].prod_id,
          prod_name,
          lanc_qtd,
          lanc_vencimento,
          entrada,
          dataAtual,
          horaAtual
        );

        const prodQtd = await produtosRepository.atualizarQuantidade(
          produto[0].prod_id,
          prod_qtd
        );
  
        res.render('lancamentos', { username: req.session.username });
      }
    } catch (error) {
      console.log(error)
      console.error('Erro ao inserir lançamento:', error);
      req.flash('error', 'Erro ao inserir lançamento. Por favor, tente novamente.');
      res.render('lancar-saida', { username: req.session.username, messages: req.flash() });
    }
  },

  getNotificacoes: async (req, res) => {
    try {
      const produtos = await produtosRepository.buscaNotificar();
  
      if (!produtos[0]) {
        // No products to notify
      } else {
        const productNames = [];
  
        for (const produto of produtos) {
          try {
            const lancamentos = await lancamentoRepository.obterLancamentoPorIdProd(produto.prod_id);
  
            for (const lancamento of lancamentos) {
              const lancamentoVencimento = new Date(lancamento.lanc_vencimento);
              const currentDate = new Date();
    
              if (lancamentoVencimento.getDate() - 1 === currentDate.getDate()) {
                const isDuplicate = productNames.some(name => name === lancamento.prod_name);
    
                if (!isDuplicate) {
                  productNames.push(lancamento.prod_name);
                }
              }
            }
          } catch (error) {
            console.error(`Error fetching Lancamento for product ${produto.prod_id}:`, error);
          }
        }
        res.json({ productNames });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
