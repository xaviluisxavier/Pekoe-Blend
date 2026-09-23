const express = require('express')
const updateUserRouter = express.Router()
const connection = require('../public/js/dbconnection')

updateUserRouter.put('/', (req, res) => {
    connection.query('UPDATE users SET email = ?, nome_user = ? WHERE id = ?', 
    [req.body.email, req.body.nome_user,  parseInt(req.body.id)],
    (err, result,) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})

module.exports = updateUserRouter