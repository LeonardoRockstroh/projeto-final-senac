const { Client } = require('pg');

// JSON conexão ao banco
const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'SCN',
    user: 'postgres',
    password: 'admin'   
};

exports.inserirProduto = async ( prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias ) => {
    const cliente = new Client(conexao);
    const sql     = "INSERT INTO produto (prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values  = [prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias];

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