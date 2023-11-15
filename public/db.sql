/* Tabela de usuário */
CREATE TABLE usuario (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);

/* Tabela de produtos */
CREATE TABLE produto (
    prod_id   serial PRIMARY KEY,
    prod_name VARCHAR(50) NOT NULL,
	prod_qtd  DECIMAL(8,3),
	prod_notif BOOL,
	prod_notif_dias INT
);

/* Tabela de lançamentos */
CREATE TABLE lancamento (
    lanc_id   serial PRIMARY KEY,
	prod_id   serial,
    prod_name VARCHAR(50) NOT NULL,
	lanc_qtd  DECIMAL(8,3),
	lanc_vencimento date,
	lanc_entrada BOOL
);