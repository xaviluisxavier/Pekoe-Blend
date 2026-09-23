const express = require('express');
const adicionarChasRouter = express.Router();
const connection = require('../public/js/dbconnection');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

adicionarChasRouter.post('/', upload.single('imagem'), (req, res) => {
    let chaid = req.body.chaid;
    let nome = req.body.nome;
    let preco = req.body.preco;
    let stock = req.body.stock;
    let descricao = req.body.descricao;
    
    let imagem = req.file ? req.file.filename : '';

    let sql = 'INSERT INTO chasportoformoso (chaid, nome, preco, stock, descricao, imagem) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(sql, [chaid, nome, preco, stock, descricao, imagem], (err, result) => {
        if (err) {
            console.log("Erro ao inserir chá na BD:", err);
            return res.status(500).json({ erro: "Erro ao gravar na base de dados. Verifica o terminal." });
        }
        res.json({ sucesso: true, mensagem: "Chá adicionado com sucesso!" });
    });
});

module.exports = adicionarChasRouter;