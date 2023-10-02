const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const loginController = require('./controllers/loginController');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar o Express para servir arquivos estáticos
app.use(express.static('public'));

// Redirecionamento da raiz para a página de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rota para a página de login
app.get('/login', loginController.getLogin);

// Rota para processar o formulário de login
app.post('/login', loginController.postLogin);

// Rota para a página de boas-vindas
app.get('/index', loginController.getWelcome);

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});