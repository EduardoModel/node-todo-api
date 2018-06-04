let mongoose = require('mongoose')

//pra setar o padrão de primises que for usar durante o código
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp')

module.exports = {mongoose}