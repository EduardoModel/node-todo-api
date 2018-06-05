const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server.js')
const {Todo} = require('./../models/todo.js')

beforeEach((done) => {
	Todo.remove({})		//remove todos os objetos já contidos dentro do database
	.then(() => done())	//por fim chama o done para prosseguir com o teste
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

			Todo.find().then((todos) => {
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
				expect(todos.length).toBe(0)
				done()
			}).catch((e) => done(e))
		})

	})


})