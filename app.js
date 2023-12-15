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
const pgp = require('pg-promise')();

const connection = {
  host: 'dpg-clttutla73kc739718o0-a',
  port: 5432,
  database: 'ice_thbi',
  user: 'ice_thbi_user',
  password: '02Vl8ETVNTRQiA8aGo4hI2MnzXAJ3IUd',
};
const db = pgp(connection);

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

async function createTables() {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS usuario (
        user_id serial PRIMARY KEY,
        user_name VARCHAR(50) NOT NULL,
        user_password VARCHAR(50) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS produto (
        prod_id   serial PRIMARY KEY,
        prod_name VARCHAR(50) NOT NULL,
        prod_qtd  DECIMAL(8,3),
        prod_uni VARCHAR(5) NOT NULL,
        prod_md_armaz VARCHAR(20) NOT NULL,
        prod_fornecedor VARCHAR(50),
        prod_tel_for VARCHAR(20),
        prod_end_for VARCHAR(120),
        prod_notif BOOL
      );

      CREATE TABLE IF NOT EXISTS lancamento (
        lanc_id   serial PRIMARY KEY,
        prod_id   serial,
        prod_name VARCHAR(50) NOT NULL,
        lanc_qtd  DECIMAL(8,3),
        lanc_vencimento DATE,
        lanc_entrada BOOL,
        lanc_dt DATE,
        lanc_tm TIME
      );
    `);

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    pgp.end();
  }
}
createTables();

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