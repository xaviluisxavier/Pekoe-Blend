const express = require('express');
const getEncomendasRouter = express.Router();
const connection = require('../public/js/dbconnection');

getEncomendasRouter.get('/', (req, res) => {
    let sql = `
        SELECT e.id, e.quantidade, e.morada, e.metodo_pagamento, e.data_compra, e.estado, c.nome AS nome_cha 
        FROM encomendas e 
        LEFT JOIN chasportoformoso c ON e.chaid = c.chaid 
        ORDER BY e.data_compra DESC
    `;
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.log("Erro ao buscar encomendas:", err);
            res.status(500).json({ erro: "Erro ao buscar dados." });
        } else {
            res.json(results); 
        }
    });
});

module.exports = getEncomendasRouter;