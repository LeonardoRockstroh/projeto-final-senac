const { Client } = require('pg');

// JSON conexão ao banco
const conexao = {
    //host: 'localhost',
    //port: 5432,
    //database: 'SCN',
    //user: 'postgres',
    //password: 'admin'   
    user: 'ice_thbi_user',
    host: 'dpg-clttutla73kc739718o0-a',
    database: 'ice_thbi',
    password: '02Vl8ETVNTRQiA8aGo4hI2MnzXAJ3IUd',
    port: '5432',
};

const pool = new Pool({
    user: 'ice_thbi_user',
    host: 'dpg-clttutla73kc739718o0-a',
    database: 'ice_thbi',
    password: '02Vl8ETVNTRQiA8aGo4hI2MnzXAJ3IUd',
    port: '5432',
  });

exports.inserirLancamento = async ( prod_id, prod_name, lanc_qtd, lanc_vencimento, lanc_entrada, lanc_dt, lanc_tm ) => {
    const cliente = new Client(conexao);
    const sql = "INSERT INTO lancamento (prod_id, prod_name, lanc_qtd, lanc_vencimento, lanc_entrada, lanc_dt, lanc_tm) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values  = [prod_id, prod_name, lanc_qtd, lanc_vencimento, lanc_entrada, lanc_dt, lanc_tm];

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

exports.getLancamentos = async ( ) => {
    const cliente = new Client(conexao);
    const sql     = "SELECT * FROM lancamento";

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

exports.getLancamentosFiltro = async ( dt_venc_ini, dt_venc_fim, dt_lanc_ini, dt_lanc_fim ) => {
    const cliente = new Client(conexao);
    const sql     = "SELECT * FROM lancamento WHERE lanc_vencimento >= $1 AND lanc_vencimento <= $2 AND lanc_dt >= $3 AND lanc_dt <= $4";
    const values  = [dt_venc_ini, dt_venc_fim, dt_lanc_ini, dt_lanc_fim];

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

exports.obterLancamentoPorId = async ( id ) => { 
    const cliente = new Client(conexao);
    const sql     = "SELECT * FROM lancamento WHERE lanc_id = $1";
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

exports.obterLancamentoPorIdProd = async ( id ) => { 
    const cliente = new Client(conexao);
    const sql     = "SELECT * FROM lancamento WHERE prod_id = $1";
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

exports.atualizarLancamento = async ( id, lanc_qtd, lanc_vencimento ) => {
    const cliente = new Client(conexao);
    const sql     = "UPDATE lancamento SET lanc_qtd = $2, lanc_vencimento = $3 WHERE lanc_id = $1 RETURNING *";
    const values  = [id, lanc_qtd, lanc_vencimento];

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

exports.deletarLancamento = async ( id ) => {
    const cliente = new Client(conexao);
    const sql = 'DELETE FROM lancamento WHERE lanc_id = $1';
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

exports.deletarLancamentoProd = async ( id ) => {
    const cliente = new Client(conexao);
    const sql = 'DELETE FROM lancamento WHERE prod_id = $1';
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