const produtosRepository = require('../repository/produtosRepository');
const express = require('express');

module.exports = {
  getProdutos: (req, res) => {
    res.render('produtos', { username: req.session.username });
  },

  getCadastroProduto: (req, res) => {
    res.render('cadastrar-produto', { username: req.session.username });
  },

  postCadastroProduto: async (req, res) => {
    const { prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias } = req.body;

    try {
      const dados = await produtosRepository.inserirProduto( prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias );
    } catch (error) {
      res.render('/cadastrar-produton', { errorMessage: 'Falha no cadastro dos dados.' });
    }

    res.redirect('/products');
  },

  getListaProdutos: async (req, res) => {
    try {

      const produtos = await produtosRepository.getListaProdutos();

      res.render('lista-produtos', { username: req.session.username, produtos });
    } catch (error) {
      res.render('error', { errorMessage: 'Erro ao carregar a lista de produtos.' });
    }
  },
};