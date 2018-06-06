const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo.js')
const {User} = require('./../server/models/user.js')

//let id = '5b1841c32252ee118b10fdd3'
//let id = '6b1841c32252ee118b10fdd3'
//let id = '5b1841c32252ee118b10fdd31'
let id = '5b1580af7b35a911ea619521'

//Verifica se a string de ID está escrita de forma correta
if(!ObjectID.isValid(id)){
	console.log('ID inválido!')
}

/*
Todo.find({
	_id: id 		//o mongoose não requer que tu faça um ObjectID para buscar determinado elemento pelo seu id!
}).then((todos) => {
	console.log('Todos ', todos)
})

//O findOne retorna somente um documento! Pega o primeiro que bate com o argumento passado
//além de retornar somente o objeto, enquanto o find retorna um array de objetos!
Todo.findOne({
	_id: id 		
}).then((todo) => {
	console.log('Todo ', todo)
})



//busca um elemento estritamente pelo ID, nada mais
Todo.findById(id).then((todo) => {
	if(!todo){		//Forma elegante de tratar o erro de ID inválido
		return console.log('Id não encontrado!')
	}
	console.log('Todo ById', todo)
}).catch((e) => console.log(e))
*/
//Se tu buscar um elemento que não bate com teu ID, ele não vai acusar nenhum erro!

User.findById(id).then((user) => {
	if(!user){
		return console.log('Id não encontrado!')
	}
	console.log('User ById:')
	console.log(JSON.stringify(user, undefined, 2))
}).catch((e) => console.log(e))
