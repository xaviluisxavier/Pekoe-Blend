const express = require('express');
const efetuarCompraRouter = express.Router();
const connection = require('../public/js/dbconnection');

efetuarCompraRouter.post('/', (req, res) => {
    let produtos = req.body.produtos; 
    let morada = req.body.morada;
    let pagamento = req.body.pagamento;

    if (!produtos || produtos.length === 0) {
        return res.status(400).json({ erro: "O carrinho está vazio." });
    }

    let processados = 0;
    let houveErro = false;

    produtos.forEach(item => {
        let chaid = parseInt(item.id);
        let quantidade = parseInt(item.quantidade);

        // 1. Guarda na tabela encomendas
        let sqlInsert = 'INSERT INTO encomendas (chaid, quantidade, morada, metodo_pagamento) VALUES (?, ?, ?, ?)';
        connection.query(sqlInsert, [chaid, quantidade, morada, pagamento], (err) => {
            if (err) houveErro = true;

            // 2. Desconta o stock 
            let sqlUpdate = 'UPDATE chasportoformoso SET stock = stock - ? WHERE chaid = ? AND stock >= ?';
            connection.query(sqlUpdate, [quantidade, chaid, quantidade], (errUpdate) => {
                if (errUpdate) houveErro = true;
                
                processados++;
                
                if (processados === produtos.length) {
                    if (houveErro) {
                        res.status(500).json({ erro: "Erro ao registar alguns produtos, verifica o teu Dashboard." });
                    } else {
                        res.json({ sucesso: true, mensagem: "Compra efetuada com sucesso!" });
                    }
                }
            });
        });
    });
});

module.exports = efetuarCompraRouter;