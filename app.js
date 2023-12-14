const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const messages = require('express-messages');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const productsController = require('./controllers/productsController');
const editarProdutoController = require('./controllers/editarProdutoController');
const deletarProdutoController = require('./controllers/deletarProdutoController');
const lancamentosController = require('./controllers/lancamentosController');
const relatorioController = require('./controllers/relatorioController');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'username',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = messages(req, res);
  res.locals.username = req.session.username;
  next();
});

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

app.use(bodyParser.json());

app.use(express.static('public'));

/* LOGIN */

// Redirecionamento da raiz para a página de login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Rota para a página de login
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);
app.get('/logout', logoutController.getLogout);

/* HOME */

// Rota para a página de boas-vindas
app.get('/index', loginController.getWelcome);

/* PRODUTOS */

// Rota para a página de produtos
app.get('/cadastrar-produto', productsController.getCadastroProduto);
app.post('/cadastrar-produto', productsController.postCadastroProduto);
app.get('/lista-de-produtos', productsController.getListaProdutos);
app.get('/editar-produto/:id', editarProdutoController.getEditarProduto);
app.post('/editar-produto/:id', editarProdutoController.postEditarProduto);
app.get('/deletar-produto/:id', deletarProdutoController.getDeletarProduto);
app.get('/buscar-produtos', productsController.getTermo);

/* LANÇAMENTOS */

// Rota para a página de lançamentos
app.get('/lancamentos', lancamentosController.getLancamentos);
app.get('/lancamentos/lancar-entrada', lancamentosController.getLancarEntrada);
app.post('/lancamentos/entrada', lancamentosController.postEntrada);
app.get('/lancamentos/lancar-saida', lancamentosController.getLancarSaida);
app.post('/lancamentos/saida', lancamentosController.postSaida);
app.get('/lancamentos/notificacao', lancamentosController.getNotificacoes);

/* RELATÓRIO */

// Rota para relatório
app.get('/relatorio', relatorioController.getListaLancamentos);
app.post('/relatorio', relatorioController.getListaLancamentosFiltro);
app.get('/editar-lancamento/:id', relatorioController.getEditarLancamento);
app.post('/editar-lancamento/:id', relatorioController.postEditarLancamento);
app.get('/deletar-lancamento/:id', relatorioController.getDeletarLancamento);

/* INICIALIZA SERVIDOR */

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});