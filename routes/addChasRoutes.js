const express = require('express')
const addChasRouter = express.Router()
const connection = require('../public/js/dbconnection')

addChasRouter.post('/', (req, res) => {
    connection.query('INSERT INTO chasportoformoso (chaid,nome,preco,stock,descricao) VALUES (?,?,?,?,?)',
    [parseInt(req.body.chaid), req.body.nome, parseFloat(req.body.preco), req.body.stock, req.body.descricao],
    (err, result,) => {
        if (err) {
            console.log('erro')
        }
        else {
            res.json(result)
        }
    })
})



module.exports = addChasRouter