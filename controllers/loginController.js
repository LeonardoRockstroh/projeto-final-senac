const express = require('express');

// controllers/loginController.js
module.exports = {
    getLogin: (req, res) => {
      res.render('login');
    },
  
    postLogin: (req, res) => {
      const { username, password } = req.body;
  
      // Simulação de um usuário de exemplo
      const user = {
        username: 'usuario',
        password: 'senha123',
      };
  
      if (username === user.username && password === user.password) {
        res.render('index', { username });
      } else {
        res.render('login', { errorMessage: 'Login falhou. Verifique suas credenciais.' });
      }
    },
  
    getWelcome: (req, res) => {
      res.render('index', { username: req.query.username });
    },
  };