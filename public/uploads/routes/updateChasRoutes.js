const express = require('express');
const updateChasRouter = express.Router();
const connection = require('../public/js/dbconnection');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

updateChasRouter.put('/', upload.single('imagem'), (req, res) => {
    
    if (req.file) {
        const novaImagem = req.file.filename;
        connection.query(
            'UPDATE chasportoformoso SET nome=?, preco=?, stock=?, descricao=?, imagem=? WHERE chaid=?',
            [req.body.nome, parseFloat(req.body.preco), req.body.stock, req.body.descricao, novaImagem, parseInt(req.body.chaid)],
            (err, result) => {
                if (err) {
                    console.log('Erro ao atualizar (com imagem):', err);
                    res.status(500).json({ erro: "Erro na base de dados" });
                } else {
                    res.json(result);
                }
            }
        );
    } 
    else {
        connection.query(
            'UPDATE chasportoformoso SET nome=?, preco=?, stock=?, descricao=? WHERE chaid=?',
            [req.body.nome, parseFloat(req.body.preco), req.body.stock, req.body.descricao, parseInt(req.body.chaid)],
            (err, result) => {
                if (err) {
                    console.log('Erro ao atualizar (sem imagem):', err);
                    res.status(500).json({ erro: "Erro na base de dados" });
                } else {
                    res.json(result);
                }
            }
        );
    }
});

module.exports = updateChasRouter;