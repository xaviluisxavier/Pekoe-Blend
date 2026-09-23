const express = require('express')
const removeChasRouter = express.Router()
const connection = require('../public/js/dbconnection')

removeChasRouter.delete('/', (req, res) => {
    connection.query('DELETE FROM chasportoformoso  WHERE chaid = ?', 
    [parseInt(req.body.chaid)],
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