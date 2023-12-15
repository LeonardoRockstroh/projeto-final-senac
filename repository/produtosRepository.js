const { Client } = require('pg');

// JSON conexão ao banco
const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'SCN',
    user: 'postgres',
    password: 'admin'   
};

exports.inserirProduto = async ( prod_name, prod_qtd = 0, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif = false ) => {
    const cliente = new Client(conexao);
    const sql = "INSERT INTO produto (prod_name, prod_qtd, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const values  = [prod_name, prod_qtd, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif];

    cliente.connect();    
        try{
            const res = await cliente.query(sql, values);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
};

exports.getListaProdutos = async ( ) => {
    const cliente = new Client(conexao);
    const sql     = "SELECT * FROM produto";

    cliente.connect();    
        try{
            const res = await cliente.query(sql);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
};

exports.obterProdutoPorId = async ( id ) => {
    const cliente = new Client(conexao);
    const sql     = "SELECT * FROM produto WHERE prod_id = $1";
    const values  = [id];

    cliente.connect();    
        try{
            const res = await cliente.query(sql, values);
            cliente.end();
            return (res.rows);
        }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
        }
}

exports.atualizarProduto = async ( id, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif ) => {
    const cliente = new Client(conexao);
    const sql     = "UPDATE produto SET prod_uni = $1, prod_md_armaz = $2, prod_fornecedor = $3, prod_tel_for = $4, prod_end_for = $5, prod_notif = $6 WHERE prod_id = $7 RETURNING *";
    const values  = [ prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif, id];

    cliente.connect();    
        try{
            const res = await cliente.query(sql, values);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
};

exports.deletarProduto = async ( id ) => {
    const cliente = new Client(conexao);
    const sql = 'DELETE FROM produto WHERE prod_id = $1';
    const values  = [id];

    cliente.connect();    
        try{
            const res = await cliente.query(sql, values);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
  };

  exports.buscarProdutosPorTermo = async (termo) => {
    const cliente = new Client(conexao);
    const sql = "SELECT * FROM produto WHERE LOWER(prod_name) LIKE LOWER($1)";
    const values = [`%${termo}%`];
  
    cliente.connect();
    try {
      const res = await cliente.query(sql, values);
      cliente.end();
      return res.rows;
    } catch (err) {
      let error = {};
      error.name = err.name;
      error.message = err.message;
      error.status = 500;
      throw error;
    }
  };

  exports.buscarNome = async ( prod_name ) => {
    const cliente = new Client(conexao);
    const sql = 'SELECT * FROM produto WHERE prod_name = $1';
    const values  = [prod_name];

    cliente.connect();    
        try{
            const res = await cliente.query(sql, values);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
  };

  exports.buscaNotificar = async ( ) => {
    const cliente = new Client(conexao);
    const sql = 'SELECT * FROM produto WHERE prod_notif = true';

    cliente.connect();    
        try{
            const res = await cliente.query(sql);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
  };

  exports.atualizarQuantidade = async ( id, prod_qtd ) => {
    const cliente = new Client(conexao);
    const sql     = "UPDATE produto SET prod_qtd = $2 WHERE prod_id = $1 RETURNING *";
    const values  = [id, prod_qtd];

    cliente.connect();    
        try{
            const res = await cliente.query(sql, values);
            cliente.end();
            return (res.rows);
         }
         catch(err){
            let error = {};
            error.name = err.name;
            error.message = err.message;
            error.status = 500;
            throw error;
         }
  };