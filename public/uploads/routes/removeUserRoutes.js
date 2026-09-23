const express = require('express')
const removeUserRouter = express.Router()
const connection = require('../public/js/dbconnection')

removeUserRouter.delete('/', (req, res) => {
    connection.query('DELETE FROM users  WHERE id = ?', 
    [parseInt(req.body.id)],
    (err, result,) => {
        if (err) {
            console.log('erro')
        }
        else {
            res.json(result)
        }
    })
})



module.exports = removeUserRouter