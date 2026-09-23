const express = require('express')
const getUserRouter = express.Router()
const connection = require('../public/js/dbconnection')

getUserRouter.get('/', (req, res) => {
    connection.query('SELECT * from  users', (err, result,) => {
        if (err) {
            console.log('erro')
        }
        else {
            res.json(result)
        }
    })
})





module.exports = getUserRouter

