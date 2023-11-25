//const lancamentoRepository = require('../repository/lancamentoRepository');
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
    res.render('lancarSaida', { username: req.session.username });
  },

  getRelatorioLancamentos: (req, res) => {
    res.render('relatorioLancamentos', { username: req.session.username });
  },

  postEntrada: async (req, res) => {
    const { prod_name, lanc_qtd, lanc_vencimento } = req.body;

    const produto = await produtosRepository.buscarNome( prod_name );

    if (!produto[0]) {
      req.flash('error', 'Produto não encontrado');
      res.render('lancar-entrada', { username: req.session.username, messages: req.flash() });
      return;
    } else {
      // produto encontrado
    }

    res.render('lancamentos', { username: req.session.username });
  },

  postSaida: async (req, res) => {
    const { prod_name, lanc_qtd, lanc_vencimento } = req.body;

    res.render('lancamentos', { username: req.session.username });
  },
};
