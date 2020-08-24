const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserByToken = (UsuarioId) => {
  return jwt.sign({id: UsuarioId}, '@nodeapi');
}

module.exports = {
  async store(req, res) {
    const usuario = await Usuario.create(req.body);
    usuario.Senha = undefined;
    return res.status(201).json({usuario, token: createUserByToken(usuario._id)});
  },

  async login(req, res) {
    const {Email, Senha } = req.body;
    
    if(!Email || !Senha) return res.status(400).json({mensagem: "Dados insuficientes!"});

    try{
        Usuario.findOne({Email}, (err, usuario) => {
            if(err) return res.json({error: "Erro ao buscar usuário"});
            if(!usuario) return res.status(400).json({error: "Usuário inválido"});

            bcrypt.compare(Senha, usuario.Senha, (err, same) => {
                if(!same) return res.status(400).json({error: "Erro ao autenticar usuário"});

                usuario.Senha = undefined;
                return res.status(200).json({usuario, token: createUserByToken(usuario._id)});
            })
        }).select('+Senha');
    }
    catch(err) {
        return res.status(400).json({erro: 'Erro ao buscar usuário'})
    }
  }
}