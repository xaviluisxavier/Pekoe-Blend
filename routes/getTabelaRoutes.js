const express = require('express')
const getTabelaRouter = express.Router()
const connection = require('../public/js/dbconnection')

getTabelaRouter.get('/', (req,res) => {
    connection.query('SELECT * from  loginusers', (err,result,) => {
        if(err){
            console.log('erro')
        }
        else {
            res.json(result)
        }
    }) 
})





module.exports = getTabelaRouter

