const express = require('express')
const removeChasRouter = express.Router()
const connection = require('../public/js/dbconnection')

removeChasRouter.delete('/', (req, res) => {
    connection.query('DELETE chasportoformoso SET nome = ?, preco = ?, stock = ?, descricao = ? WHERE id = ?', 
    [req.body.nome, parseFloat(req.body.preco), req.body.stock, req.body.descricao, parseInt(req.body.id)],
    (err, result,) => {
        if (err) {
            console.log('erro')
        }
        else {
            res.json(result)
        }
    })
})



module.exports = removeChasRouter