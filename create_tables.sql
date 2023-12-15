/* Tabela de usuário */
CREATE TABLE IF NOT EXISTS usuario (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);

/* Tabela de produtos */
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

/* Tabela de lançamentos */
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