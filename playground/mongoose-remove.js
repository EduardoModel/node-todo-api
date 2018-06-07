const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')
/*
//Para remover todos os elementos da tua coleção, simplesmente passa um objeto vazio pra buscar
Todo.remove({}).then((result) => {
	console.log(result)
})
*/

//retorna o documento removido
//Todo.findOndeAndRemove()
//Todo.findByIdAndRemove()
/*
//Usa esse quando precisa buscar por mais que um atributo
Todo.findOndeAndRemove({_id: '5b19b0d635ba001592a2b3c1'}).then((todo) => {

})
*/
//Esse busca especificamente pelo id do elemento na coleção
Todo.findByIdAndRemove('5b19b0d635ba001592a2b3c1').then((todo) => {
	console.log(todo)
})