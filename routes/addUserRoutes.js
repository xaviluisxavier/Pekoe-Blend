const express = require('express')
const addUserRouter = express.Router()
const connection = require('../public/js/dbconnection')

addUserRouter.post('/', (req, res) => {
    let encPass = bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(2))

    connection.query('INSERT INTO users (id,nome_user,email,senha) VALUES (?,?,?,?)',
    [parseInt(req.body.id), req.body.nome_user, req.body.email, encPass],
    (err, result,) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})



module.exports = addUserRouter