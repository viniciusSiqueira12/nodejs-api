const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProdutoSchema = new mongoose.Schema({
  Nome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  Preco: {
    type: Number,
    required: true
  },
  UrlFoto: {
    type: String,
    required: true
  },
  Usuario: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario' 
  },
  DataCriacao: {
    type: Date,
    default: Date.now
  }
});

ProdutoSchema.plugin(mongoosePaginate);
mongoose.model('Produto', ProdutoSchema);