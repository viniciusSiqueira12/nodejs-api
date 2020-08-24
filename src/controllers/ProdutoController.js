const mongoose = require('mongoose');
const { store } = require('./AutenticacaoController');
const Produto = mongoose.model('Produto');
const Usuario = mongoose.model('Usuario');

module.exports = {
  async store(req, res) {
    try{
      const usuarioId = res.locals.auth_data.id;
      req.body.UrlFoto =  `files/${req.file.filename}`;
      req.body.Usuario = usuarioId;

      const usuario = await Usuario.findById(usuarioId); 
      // console.log(usuario.Produtos);
      // const existeProduto = usuario.Produtos.Nome;
      // console.log(existeProduto);
      // if(existeProduto)
      //   return res.status(400).json({mensagem: 'Ops! Parece que já existe um produto com esse nome!'});
      console.log(req.body);
      const produto = await Produto.create(req.body);
      usuario.Produtos.push(produto);
      await usuario.save();
  
      return res.status(201).json({produto});
    }
    catch(err) {
      return res.status(400).json({Erro: err});
    }
  },

  async listarProdutos(req, res) {
    try {
      const usuarioId = res.locals.auth_data.id;

      const filters = {};
      filters.Usuario = usuarioId; 
      if(req.query.nome) {
        filters.Nome = new RegExp(req.query.nome, 'i');
      } 
      const produtos = await Produto.paginate(
        filters
      ,{
        page: req.query.page || 1,
        limit: 10,
        sort: '-DataCriacao'
      });
      return res.status(200).json({produtos});
      
    }
    catch(err) {
      return res.status(400).json({Erro: err});
    }
  },

  async update(req, res) {
    try {
      req.body.UrlFoto =  `files/${req.file.filename}`;
      console.log(req.body);
      const produto = await Produto.findByIdAndUpdate(req.params.id, req.body);
      return res.json({produto});
    }
    catch(err) {
      return res.status(400).json({Erro: err})
    }
  },

  async destroy(req, res) {
    await Produto.findByIdAndDelete(req.params.id);

    return res.status(200).json({mensagem: 'Sucesso ao excluir'});
  }
}