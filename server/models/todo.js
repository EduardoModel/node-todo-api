let mongoose = require('mongoose')

//define o corpo dos objetos que serão armazenados dentro da coleção
let Todo = mongoose.model('Todos', {
	text: {
		type: String,
		required: true, //<---  validator
		minlength: 1,	//<---  validator
		trim: true		//<---  validator
		},
	completed: {
		type: Boolean,
		default: false	//<---  validator
	},
	completedAt: {
		type: Number,
		default: null	//<---  validator
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true

	}
})

module.exports = {Todo}



/*
let newTodo = new Todo({
	text: 'Cozinhar a janta'

})

newTodo.save().then((doc) => {
	console.log(`Salvo o documento! ${doc}`)
}, (e) => {
	console.log('Não foi possível salvar o objeto!')
})
*/

/*
let newTodo = new Todo({
	text: 'Fazer tal coisa',
	completed: false,
	completedAt: 0
})
*/
/*
//para evitar adicionar objetos vazios no database, tem que usar os validators providos pelo mongoose!
let newTodo = new Todo({})
newTodo.save().then((doc) => {
	console.log(JSON.stringify(doc, undefined, 2))
}, (err) => {
	console.log('Não foi possível salvar o objeto!', err)
})


let newUser = new User({
	email: 'teste@teste.com'
})
newUser.save().then((doc) => {
	console.log(JSON.stringify(doc, undefined, 2))
}, (err) => {
	console.log('Não foi possivel salvar o objeto!')
})

*/
