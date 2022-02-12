const express = require('express')
const getChasRouter = express.Router()
const connection = require('../public/js/dbconnection')

getChasRouter.get('/', (req,res) => {
    connection.query('SELECT * FROM chasportoformoso', (err,result,) => {
        if(err){
            console.log('erro')
        }
        else {
            res.json(result)
        }
    }) 
})



module.exports = getChasRouter