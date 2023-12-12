const produtosRepository = require('../repository/produtosRepository');
const lancamentoRepository = require('../repository/lancamentoRepository');
const express = require('express');

module.exports = {
  getProdutos: (req, res) => {
    res.render('produtos', { username: req.session.username });
  },

  getCadastroProduto: (req, res) => {
    res.render('cadastrar-produto', { username: req.session.username });
  },

  postCadastroProduto: async (req, res) => {
    const { prod_name, prod_qtd, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_vencimento, prod_notif, prod_notif_dias } = req.body;
    const dataAtual = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().toLocaleTimeString();

    prod_notif_dias_int = prod_notif_dias
    if (prod_notif_dias == null || prod_notif == undefined){
      prod_notif_dias_int = 0
    }
    
    if (!prod_vencimento) {
      // Não preenchido
      lanc_vencimento = '9999-12-01'
    } else {
      if (prod_vencimento < dataAtual) {
        req.flash('error', 'A data de vencimento não pode ser menor que a data atual.');
        res.render('cadastrar-produto', { username: req.session.username, messages: req.flash() });
        return;
      }
    }

    try {
      const dados = await produtosRepository.inserirProduto( prod_name, prod_qtd, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif, prod_notif_dias_int );
      const dadosLancamento = await lancamentoRepository.inserirLancamento(
        dados[0].prod_id,
        prod_name,
        prod_qtd,
        lanc_vencimento,
        true,
        dataAtual,
        horaAtual
      );
    } catch (error) {
      res.render('/cadastrar-produto', { errorMessage: 'Falha no cadastro dos dados.' });
    }

    res.redirect('/lista-de-produtos');
  },

  getListaProdutos: async (req, res) => {
    try {

      var produtos = await produtosRepository.getListaProdutos();

      const produtosFormatados = produtos.map(item => ({
        ...item,
        prod_vencimento: new Date(item.prod_vencimento).toLocaleDateString('pt-BR')
      }));
      produtos = produtosFormatados

      res.render('lista-produtos', { username: req.session.username, produtos });
    } catch (error) {
      res.render('error', { errorMessage: 'Erro ao carregar a lista de produtos.' });
    }
  },

   getTermo: async (req, res) => {
    const termo = req.query.termo;
  
    try {
      const produtos = await produtosRepository.buscarProdutosPorTermo(termo);
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  },
};