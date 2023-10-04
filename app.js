const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const productsController = require('./controllers/productsController');
const notificationsController = require('./controllers/notificationsController');

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

// Rota para processar o formulário de login
app.get('/logout', logoutController.getLogout);

// Rota para a página de boas-vindas
app.get('/index', loginController.getWelcome);

// Rota para a página de produtos
app.get('/products', productsController.getProducts);

// Rota para a página de notificações
app.get('/notifications', notificationsController.getNotifications);

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});