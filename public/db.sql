/* Tabela de usuário */
CREATE TABLE usuario (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);