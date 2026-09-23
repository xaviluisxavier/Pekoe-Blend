const express = require('express');
const getChasRouter = express.Router();
const connection = require('../public/js/dbconnection');

getChasRouter.get('/', (req, res) => {
    let userId = (req.session && req.session.userId) ? req.session.userId : 0;

    let sql = `
        SELECT 
            c.*, 
            COUNT(f.users_id) AS total_favoritos,
            MAX(CASE WHEN f.users_id = ? THEN 1 ELSE 0 END) AS eu_gostei
        FROM chasportoformoso c 
        LEFT JOIN chafavorito f ON c.chaid = f.chasportoformoso_chaid 
        GROUP BY c.chaid
    `;
    
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.log('Erro ao buscar os chás e favoritos:', err);
            res.status(500).json({ erro: "Erro ao carregar os chás" });
        } else {
            console.log("Resultado da BD:", result[0]); 
            res.json(result);
        }
    });
});

module.exports = getChasRouter;