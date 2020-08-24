const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  Nome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60
  },
  Sobrenome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60
  },
  Email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 3,
    maxlength: 100
  },
  Senha: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 50
  },
  Produtos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto'
  }],
  DataCriacao : {
    type: Date,
    default: Date.now
  }
});

UsuarioSchema.pre('save', function(next){
  let usuario = this;
  if(!usuario.isModified('Senha'))
    return next();
  
  bcrypt.hash(usuario.Senha, 10, (err, encrypted) => {
    usuario.Senha = encrypted;
    return next();
  });
});

mongoose.model("Usuario", UsuarioSchema);