const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo.js')
const {User} = require('./../../models/user.js')

const user1ID = new ObjectID()
const user2ID = new ObjectID()

const users = [{
	_id: user1ID,
	email: 'edu@teste.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: user1ID, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
}, {
	_id: user2ID,
	email: 'pixunguinha@teste.com',
	password: 'userTwoPass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: user2ID, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
}]



const todos = [{
	_id: new ObjectID(),
	text: 'Teste 1',
	_creator: user1ID
}, {
	_id: new ObjectID(),
	text: 'Teste 2',
	completed: true,
	completedAt: 123,
	_creator: user2ID
}]

const populateTodos = (done) => {
	Todo.remove({})		//remove todos os objetos já contidos dentro do database
	.then(() => {
		return Todo.insertMany(todos)	//Adiciona uns objetos para teste
	}).then(() => done())	//por fim chama o done para prosseguir com o teste
}

const populateUsers = (done) => {
	User.remove({}).then(() => {
		let userOne = new User(users[0]).save()
		let userTwo = new User(users[1]).save()
		//espera todas as promessas retornarem
		return Promise.all([userOne, userTwo])
	}).then(() => done())
}

module.exports = {todos, populateTodos, users, populateUsers}