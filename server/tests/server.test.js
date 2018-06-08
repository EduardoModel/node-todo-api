const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')


const {app} = require('./../server.js')
const {Todo} = require('./../models/todo.js')

const todos = [{
	_id: new ObjectID(),
	text: 'Teste 1'
}, {
	_id: new ObjectID(),
	text: 'Teste 2',
	completed: true,
	completedAt: 123
}]

beforeEach((done) => {
	Todo.remove({})		//remove todos os objetos já contidos dentro do database
	.then(() => {
		return Todo.insertMany(todos)	//Adiciona uns objetos para teste
	}).then(() => done())	//por fim chama o done para prosseguir com o teste
})



describe('POST /todos', () => {
	it('deve criar um novo todo', (done) => {
		let text = 'teste'


		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text)
		})
		.end((err, res) => {
			if(err){
				return done(err)
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1)
				expect(todos[0].text).toBe(text)
				done()
			}).catch((e) => done(e))
		})
	})


	it('não deve criar um todo com informações inválidas no campo body', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if(err){
				return done(err)
			}
			Todo.find().then((todos) => {
				expect(todos.length).toBe(2)
				done()
			}).catch((e) => done(e))
		})

	})

	describe('GET /todos', () => {
		it('Deve retornar todos os todos', (done) => {
			request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2)
			})
			.end(done)
		})
	})

	describe('GET /todos/:id', () => {
		it('Deve retornar o doc todo', (done) => {
			request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text)
			})
			.end(done)
		})

		it('deve retornar um 404 se o todo não for encontrado', (done) => {
			let HexId = new ObjectID().toHexString()

			request(app)
			.get(`/todos/${HexId}`)
			.expect(404)
			.end(done)
		})

		it('deve retornar 404 para ids que não são objetos', (done) => {
			request(app)
			.get('/todos/123')
			.expect(404)
			.end(done)
		})
	})
})

describe('DELETE /todos/:id', () => {
	it('Deve remover um todo', (done) => {
		let HexId = todos[1]._id.toHexString()

		request(app)
		.delete(`/todos/${HexId}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(HexId)
		})
		.end((err, res) => {
			if(err){
				return done(err)
			}
			Todo.findById(HexId).then((todo) => {
				expect(todo).toBeFalsy()
				done()
			}).catch((e) => done(e))
		})

	})

	it('Deve retornar um 404 se o todo não existir', (done) => {
		let HexId = new ObjectID().toHexString()

		request(app)
		.delete(`/todos/${HexId}`)
		.expect(404)
		.end(done)
	})

	it('Deve retornar 404 se o ObjectID é inválido', (done) => {
		request(app)
		.delete('/todos/123')
		.expect(404)
		.end(done)
	})
})

describe('PATCH /todos/:id', () => {
	it('Deve atualizar o todo', (done) => {
		let HexId = todos[0]._id.toHexString()
		let text = 'Teste de patch'

		request(app)
		.patch(`/todos/${HexId}`)
		.send({
			completed: true,
			text
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text)
			expect(res.body.todo.completed).toBe(true)
			expect(typeof res.body.todo.completedAt).toBe('number')
		})
		.end(done)
	})

	it('Deve limpar o completedAt do todo', (done) => {
		let HexId = todos[1]._id.toHexString()
		let text = 'Teste de patch novo!!!'


		request(app)
		.patch(`/todos/${HexId}`)
		.send({
			text,
			completed: false
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text)
			expect(res.body.todo.completed).toBe(false)
			expect(res.body.todo.completedAt).toBeFalsy()
		})
		.end(done)
		

	})
})