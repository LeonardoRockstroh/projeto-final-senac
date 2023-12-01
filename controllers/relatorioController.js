const lancamentoRepository = require('../repository/lancamentoRepository');
const express = require('express');

module.exports = {
  getRelatorio: (req, res) => {
    res.render('relatorio', { username: req.session.username });
  },

  getListaLancamentos: async (req, res) => {
    try {
        var lancamentos = await lancamentoRepository.getLancamentos();

        console.log('sem filtro')

        var lancamentosFormatados = lancamentos.map(item => ({
            ...item,
            lanc_vencimento: new Date(item.lanc_vencimento).toLocaleDateString('pt-BR'),
            lanc_dt: new Date(item.lanc_dt).toLocaleDateString('pt-BR')
          }));
        lancamentos = lancamentosFormatados

        res.render('relatorio', { username: req.session.username, lancamentos });
    } catch (error) {
        res.render('error', { errorMessage: 'Erro ao carregar a lista de lançamentos.' });
    }
  },

  getListaLancamentosFiltro: async (req, res) => {
    try {
        console.log('com filtro')

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
            lanc_vencimento: new Date(item.lanc_vencimento).toLocaleDateString('pt-BR'),
            lanc_dt: new Date(item.lanc_dt).toLocaleDateString('pt-BR')
          }));
        lancamentos = lancamentosFormatados

        res.json(lancamentos);

        //res.render('relatorio', { username: req.session.username, lancamentos });
    } catch (error) {
        res.render('error', { errorMessage: 'Erro ao carregar a lista de lançamentos.' });
    }
  },
};