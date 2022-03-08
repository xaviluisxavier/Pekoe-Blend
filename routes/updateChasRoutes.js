const express = require('express')
const updateChasRouter = express.Router()
const connection = require('../public/js/dbconnection')

updateChasRouter.put('/', (req, res) => {
    connection.query('UPDATE chasportoformoso SET nome = ?, preco = ?, stock = ?, descricao = ? WHERE chaid = ?', 
    [req.body.nome, parseFloat(req.body.preco), req.body.stock, req.body.descricao, parseInt(req.body.chaid)],
    (err, result,) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})



module.exports = updateChasRouter