const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')
const {User} = require('./../models/user')

const {app} = require('./../server.js')
const {Todo} = require('./../models/todo.js')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js')

beforeEach(populateUsers)
beforeEach(populateTodos)


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

describe('GET /users/me', () => {
	it('Deve retornar um usuário se ele estiver autenticado', (done) => {
		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res) => {
			expect(res.body._id).toBe(users[0]._id.toHexString())
			expect(res.body.email).toBe(users[0].email)
		})
		.end(done)
	})

	it('Deve retornar 401 se não for autenticado', (done) => {
		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res) => {
			expect(res.body).toEqual({})
		})
		.end(done)
	})
})

describe('POST /users', () => {
	it("Deve criar um usuário", (done) => {
		let email = 'exemplo@exemplo.com'
		let password = '123mnbs'

		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res) => {
			expect(res.headers['x-auth']).toBeTruthy()
			expect(res.body._id).toBeTruthy()
			expect(res.body.email).toBe(email)
		})
		.end((err) => {
			if(err){
				return done(err)
			}

			User.findOne({email}).then((user) => {
				expect(user).toBeTruthy()
				expect(user.password).not.toBe(password)
				done()
			}).catch((err) => done(err))
		})
	})

	it('Deve retornar erros de validação para requisições inválidas', (done) => {
		let email = 'pixunga@pixa'
		let password = '1234'
		request(app)
		.post('/users')
		.send({email,password})
		.expect(400)
		.end(done)
	})

	it('Não deve criar usuário se o email já estiver em uso', (done) => {
		let email = users[0].email
		let password = '1235435474'
		request(app)
		.post('/users')
		.send({email,password})
		.expect(400)
		.end(done)
	})
	

})

describe('POST /users/login', () => {
	it('Deve logar o usuário e retornar o auth token', (done) => {
		request(app)
		.post('/users/login')
		.send({
			email: users[1].email,
			password: users[1].password
		})
		.expect(200)
		.expect((res) => {
			expect(res.headers['x-auth']).toBeTruthy()
		})
		.end((err, res) => {
			if(err){
				return done(err)
			}

			User.findById(users[1]._id).then((user) => {
				expect(user.tokens[0]).toMatchObject({
					access: 'auth',
					token: res.headers['x-auth']
				})
				done()
			}).catch((err) => done(err))
		})
	})

	it('Deve rejeitar login inválido', (done) => {
		request(app)
		.post('/users/login')
		.send({
			email: users[1].email,
			password: users[1].password+'123'
		})
		.expect(400)
		.expect((res) => {
			expect(res.headers['x-auth']).not.toBeTruthy()
		})
		.end((err, res) => {
			if(err){
				return done(err)
			}

			User.findById(users[1]._id).then((user) => {
				expect(user.tokens.length).toBe(0)
				done()
			}).catch((err) => done(err))
		})
	})
})

describe('DELETE /users/me/token', () => {
	it('Deve deletar o token auth do usuário quando realizado o logout', (done) => {
		request(app)
		.delete('/users/me/token')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.end((err, res) => {
			if(err){
				return done(err)
			}

			User.findById(users[0]._id).then((user) => {
				expect(user.tokens.length).toBe(0)
				done()
			}).catch((err) => done(err))
		})
	})
})