const lancamentoRepository = require('../repository/lancamentoRepository');
const produtosRepository = require('../repository/produtosRepository');
const express = require('express');

module.exports = {
  getRelatorio: (req, res) => {
    res.render('relatorio', { username: req.session.username });
  },

  getListaLancamentos: async (req, res) => {
    try {
        var lancamentos = await lancamentoRepository.getLancamentos();

        var lancamentosFormatados = lancamentos.map(item => ({
            ...item,
            lanc_vencimento: item.lanc_vencimento ? new Date(item.lanc_vencimento) : null,
            lanc_dt: item.lanc_dt ? new Date(item.lanc_dt).toLocaleDateString('pt-BR') : null
        }));
        lancamentos = lancamentosFormatados;

        lancamentos.sort((a, b) => {
            const dateA = a.lanc_vencimento;
            const dateB = b.lanc_vencimento;

            if (!dateA && !dateB) {
                return 0;
            } else if (!dateA) {
                return 1; 
            } else if (!dateB) {
                return -1; 
            }

            return dateA - dateB;
        });

        lancamentosFormatados = lancamentos.map(item => ({
          ...item,
          lanc_vencimento: new Date(item.lanc_vencimento).toLocaleDateString('pt-BR'),
          lanc_dt: new Date(item.lanc_dt).toLocaleDateString('pt-BR')
        }));
      lancamentos = lancamentosFormatados

        res.render('relatorio', { username: req.session.username, lancamentos });
    } catch (error) {
        console.error(error);
        res.render('error', { errorMessage: 'Erro ao carregar a lista de lançamentos.' });
    }
 },

  getListaLancamentosFiltro: async (req, res) => {
    try {
        // Recupere os filtros do corpo da solicitação
        let { filterVencimentoMin, filterVencimentoMax, filterLancamentoMin, filterLancamentoMax } = req.body;

        if (!filterVencimentoMin) {
            filterVencimentoMin = '0001-01-01';
        }

        if (!filterLancamentoMin) {
            filterLancamentoMin = '0001-01-01';
        }

        if (!filterVencimentoMax) {
            filterVencimentoMax = '9999-12-01';
        }

        if (!filterLancamentoMax) {
            filterLancamentoMax = '9999-12-01';
        }

        // Passe os filtros para o método de consulta
        var lancamentos = await lancamentoRepository.getLancamentosFiltro(
            filterVencimentoMin,
            filterVencimentoMax,
            filterLancamentoMin,
            filterLancamentoMax
        );

        var lancamentosFormatados = lancamentos.map(item => ({
          ...item,
          lanc_vencimento: item.lanc_vencimento ? new Date(item.lanc_vencimento) : null,
          lanc_dt: item.lanc_dt ? new Date(item.lanc_dt).toLocaleDateString('pt-BR') : null
        }));
        lancamentos = lancamentosFormatados;

        lancamentos.sort((a, b) => {
          const dateA = a.lanc_vencimento;
          const dateB = b.lanc_vencimento;

          if (!dateA && !dateB) {
              return 0;
          } else if (!dateA) {
              return 1; 
          } else if (!dateB) {
              return -1; 
          }

          return dateA - dateB;
        });

        lancamentosFormatados = lancamentos.map(item => ({
            ...item,
            lanc_vencimento: new Date(item.lanc_vencimento).toLocaleDateString('pt-BR'),
            lanc_dt: new Date(item.lanc_dt).toLocaleDateString('pt-BR')
          }));
        lancamentos = lancamentosFormatados

        res.json(lancamentos);
    } catch (error) {
        res.render('error', { errorMessage: 'Erro ao carregar a lista de lançamentos.' });
    }
  },

  getEditarLancamento: async (req, res) => {
    try {
      const id = req.params.id;

      const lancamentoTB = await lancamentoRepository.obterLancamentoPorId(id);
      lancamento = lancamentoTB[0]

      res.render('editar-lancamento', { lancamento });
    } catch (error) {
      res.redirect('/relatorio');
    }
  },

  postEditarLancamento: async (req, res) => {
    try {
      const id = req.params.id;
      const { lanc_qtd, lanc_vencimento } = req.body;
      const dataAtual = new Date().toISOString().split('T')[0];
      var prod_qtd = parseFloat(0);
      var dif = parseFloat(0);

      if (!lanc_vencimento ) {
        // Não preenchido
      } else {
        if (lanc_vencimento < dataAtual) {
          req.flash('error', 'A data de vencimento não pode ser menor que a data atual.');
          res.render('editar-lancamento', { username: req.session.username, messages: req.flash() });
          return;
        }
      }
      
      const lancamentoTB = await lancamentoRepository.obterLancamentoPorId(id);
      const produto = await produtosRepository.obterProdutoPorId(lancamentoTB[0].prod_id);
      
      if ( lancamentoTB[0].lanc_entrada == true ) {
        if ( lancamentoTB[0].lanc_qtd > lanc_qtd ) {
          dif = parseFloat(lancamentoTB[0].lanc_qtd) - parseFloat(lanc_qtd);
          prod_qtd = parseFloat(produto[0].prod_qtd) - parseFloat(dif);
        } else {
          dif = parseFloat(lanc_qtd) - parseFloat(lancamentoTB[0].lanc_qtd);
          prod_qtd = parseFloat(produto[0].prod_qtd) + parseFloat(dif);
        }
      } else {
        if ( lancamentoTB[0].lanc_qtd > lanc_qtd ) {
          dif = parseFloat(lancamentoTB[0].lanc_qtd) - parseFloat(lanc_qtd);
          prod_qtd = parseFloat(produto[0].prod_qtd) + parseFloat(dif);
        } else {
          dif = parseFloat(lanc_qtd) - parseFloat(lancamentoTB[0].lanc_qtd);
          prod_qtd = parseFloat(produto[0].prod_qtd) - parseFloat(dif);
        }
      }

      const prodQtd = await produtosRepository.atualizarQuantidade(
        produto[0].prod_id,
        prod_qtd
      );
      const lancamentoUP = await lancamentoRepository.atualizarLancamento( id, lanc_qtd, lanc_vencimento )

      res.redirect('/relatorio');
    } catch (error) {
      console.log(error)
      res.redirect('/relatorio');
    }
  },

  getDeletarLancamento: async (req, res) => {
    try {
      const id = req.params.id;
      var prod_qtd = parseFloat(0);
      
      const lancamentoTB = await lancamentoRepository.obterLancamentoPorId(id);
      const produto = await produtosRepository.obterProdutoPorId(lancamentoTB[0].prod_id);
      
      if ( lancamentoTB[0].lanc_entrada == true ) {
        prod_qtd = parseFloat(produto[0].prod_qtd) - parseFloat(lancamentoTB[0].lanc_qtd);
      } else {
        prod_qtd = parseFloat(produto[0].prod_qtd) + parseFloat(lancamentoTB[0].lanc_qtd);
      }

      const prodQtd = await produtosRepository.atualizarQuantidade(
        produto[0].prod_id,
        prod_qtd
      );
      const lancamentoUP = await lancamentoRepository.deletarLancamento( id )

      res.redirect('/relatorio');
    } catch (error) {
      console.log(error)
      res.redirect('/relatorio');
    }
  },
};