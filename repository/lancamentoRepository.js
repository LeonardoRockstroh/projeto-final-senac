const { Client } = require('pg');

// JSON conexão ao banco
const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'SCN',
    user: 'postgres',
    password: 'admin'   
};

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