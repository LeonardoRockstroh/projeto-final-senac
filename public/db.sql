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
	prod_uni VARCHAR(5) NOT NULL,
	prod_md_armaz VARCHAR(20) NOT NULL,
	prod_fornecedor VARCHAR(50),
	prod_tel_for VARCHAR(20),
	prod_end_for VARCHAR(120),
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

/*
1 - Simplificar descrição de botões
2 - Produtos entrar direto na lista, e ter um botão para inserir um novo produto
3 - Tela inicial incluir relatório de lançamentos

no problema posso colocar sistemas que encontrei

objetovos: colocar o primeiro como objetivo geral, e os demais como especificos

Stack Tecnológico
detalhar o uso de cada técnologia

descrição:
descrição da aplicação, e funcionalidades, telas.

validação/ colocar com estratégia / consolidação analise das respostas
questionario de objetivos atingidos, uso do cliente.
*/