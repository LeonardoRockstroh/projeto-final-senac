const loginRepository = require('../repository/loginRepository');
const express = require('express');

module.exports = {
    getLogin: (req, res) => {
      res.render('login');
    },
  
    postLogin: async (req, res) => {
      const { username, password } = req.body;

      req.session.username = username;

      console.log(req.session.username)

      try {
        const usuario = await loginRepository.buscaUsuario(username, password);
  
        if (usuario[0].user_id) {
          res.render('index', { username });
        } else {
          res.render('login', { errorMessage: 'Login falhou. Verifique suas credenciais.' });
        }
      } catch (error) {
        res.render('login', { errorMessage: 'Login falhou. Verifique suas credenciais.' });
      }
    },
  
    getWelcome: (req, res) => {
      res.render('index', { username: req.query.username });
    },
  };