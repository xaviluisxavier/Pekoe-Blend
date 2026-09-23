const express = require('express');
const updateEstadoRouter = express.Router();
const connection = require('../public/js/dbconnection');

updateEstadoRouter.put('/', (req, res) => {
    let id = parseInt(req.body.id);
    let novoEstado = req.body.estado;

    connection.query('UPDATE encomendas SET estado = ? WHERE id = ?', [novoEstado, id], (err, result) => {
        if (err) {
            console.log("Erro ao atualizar estado:", err);
            res.status(500).json({ erro: "Erro ao atualizar o estado na base de dados." });
        } else {
            res.json({ sucesso: true, mensagem: "Estado alterado com sucesso." });
        }
    });
});

module.exports = updateEstadoRouter;