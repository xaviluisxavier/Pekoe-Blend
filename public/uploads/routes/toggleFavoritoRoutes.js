const express = require('express');
const toggleFavoritoRouter = express.Router();
const connection = require('../public/js/dbconnection');

toggleFavoritoRouter.post('/', (req, res) => {
    let userId = req.session.userId; 
    let chaId = req.body.chaid;

    if (!userId) {
        return res.status(401).json({ erro: "Precisas de iniciar sessão para favoritar um chá!" });
    }

    let sqlCheck = 'SELECT * FROM chafavorito WHERE chasportoformoso_chaid = ? AND users_id = ?';
    
    connection.query(sqlCheck, [chaId, userId], (err, results) => {
        if (err) {
            console.log("Erro na BD (Select Favorito):", err);
            return res.status(500).json({ erro: "Erro na base de dados." });
        }

        if (results.length > 0) {
            let sqlDelete = 'DELETE FROM chafavorito WHERE chasportoformoso_chaid = ? AND users_id = ?';
            connection.query(sqlDelete, [chaId, userId], (errDel) => {
                if (errDel) return res.status(500).json({ erro: "Erro ao remover favorito." });
                res.json({ sucesso: true, acao: 'removido' });
            });
        } else {
            let sqlInsert = 'INSERT INTO chafavorito (chasportoformoso_chaid, users_id) VALUES (?, ?)';
            connection.query(sqlInsert, [chaId, userId], (errIns) => {
                if (errIns) return res.status(500).json({ erro: "Erro ao adicionar favorito." });
                res.json({ sucesso: true, acao: 'adicionado' });
            });
        }
    });
});

module.exports = toggleFavoritoRouter;