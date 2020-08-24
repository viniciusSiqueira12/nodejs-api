const express = require('express');
const routes = express.Router();
const multer = require('./config/multer');
const authorized = require('./middlewares/Auth');

const AutenticacaoController = require('./controllers/AutenticacaoController');
const ProdutoController = require('./controllers/ProdutoController');

//Autenticacão
routes.post('/acesso/criar', AutenticacaoController.store);
routes.post('/acesso/autenticar', AutenticacaoController.login);


//Produtos
routes.post('/produtos/criar', authorized ,multer.single('imagem'), ProdutoController.store);
routes.get('/produtos/listar', authorized, ProdutoController.listarProdutos);
routes.put('/produtos/editar/:id', authorized, multer.single('imagem'), ProdutoController.update);
routes.delete('/produtos/deletar/:id', authorized, ProdutoController.destroy);

module.exports = routes;

