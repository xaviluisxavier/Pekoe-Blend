-- 1. Cria a base de dados (se não existir) e seleciona-a
CREATE DATABASE IF NOT EXISTS chasdb;
USE chasdb;

-- 2. Cria a tabela de Utilizadores
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- 3. Cria a tabela de Chás
CREATE TABLE IF NOT EXISTS chasportoformoso (
    chaid INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255) DEFAULT 'sem-imagem.png'
);

-- 4. Cria a tabela de Favoritos com Chaves Estrangeiras (Foreign Keys)
CREATE TABLE IF NOT EXISTS chafavorito (
    chafavorito INT AUTO_INCREMENT PRIMARY KEY,
    chasportoformoso_chaid INT NOT NULL,
    users_id INT NOT NULL,
    FOREIGN KEY (chasportoformoso_chaid) REFERENCES chasportoformoso(chaid) ON DELETE CASCADE,
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Cria a tabela de Encomendas
CREATE TABLE IF NOT EXISTS encomendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    nome_cha VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    morada TEXT NOT NULL,
    metodo_pagamento VARCHAR(50) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Pendente'
);

-- ==========================================
-- DADOS DE EXEMPLO (INSERTS)
-- ==========================================

INSERT INTO users (nome_user, email, senha) VALUES 
('Luís Pacheco', 'admin@pekoe.pt', '123456'),
('Cliente Teste', 'cliente@gmail.com', '123456');

INSERT INTO chasportoformoso (chaid, nome, preco, stock, descricao, imagem) VALUES 
(1, 'Chá Verde Pekoe', 5.50, 50, 'Chá verde de folha enrolada, sabor delicado e propriedades antioxidantes.', 'pekoe.jpg'),
(2, 'Chá Preto Orange Pekoe', 6.00, 30, 'Chá preto aromático e leve, ideal para o pequeno-almoço.', 'orange_pekoe.jpg'),
(3, 'Chá Preto Broken Leaf', 4.50, 100, 'Chá preto forte e encorpado, perfeito para misturar com leite.', 'broken_leaf.jpg');

INSERT INTO chafavorito (chasportoformoso_chaid, users_id) VALUES 
(1, 1),
(3, 1),
(2, 2);

INSERT INTO encomendas (nome_cha, quantidade, morada, metodo_pagamento, estado) VALUES 
('Chá Verde Pekoe', 2, 'Estrada Regional 24, 9625-413 Porto Formoso', 'MBWay', 'Pendente'),
('Chá Preto Orange Pekoe', 1, 'Rua Direita, 45, Ponta Delgada', 'Transferencia', 'Enviada');