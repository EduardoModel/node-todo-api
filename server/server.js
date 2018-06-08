require('./config/config.js')

const _ = require('lodash')

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')


let {mongoose} = require('./db/mongoose.js')
let {Todo} = require('./models/todo.js')
let {User} = require('./models/user.js')

let app = express()

const port = process.env.PORT


//middleware é a função json do bodyParser
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	})
	todo.save().then((doc) => {
		res.send(doc)
	}, (err) => {
		res.status(400).send(err)
	})
})

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos			//Envia de volta sendo um objeto e não um simples array como foi recebido!
		//poderia adicionar outras propriedades aqui
		})		
	}, (err) => {
		res.status(400).send(err)
	})
})

//o :id é para passar algo como parâmetro na url, transforma o argumento/séries de argumentos
//em um objeto nomeado com chave-valor
app.get('/todos/:id', (req, res) => {
	let id = req.params.id
	if(!ObjectID.isValid(id)){
		return res.status(404).send()
	}
	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(404).send()
		}
		res.send({todo})	//envia como um objeto para, caso queira, adicionar mais propriedades na mensagem
	}).catch((e) => res.status(400).send())
})


app.delete('/todos/:id', (req, res) => {
	let id = req.params.id
	if(!ObjectID.isValid(id)){
		return res.status(404).send()
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(404).send()
		}
		res.send({todo})
	}).catch((e) => res.status(400).send())
})

app.patch('/todos/:id', (req, res) => {
	let id = req.params.id
	//o metodo pick retira propriedades de um objeto, passando-as atraves do argumento da função
	let body = _.pick(req.body, ['text', 'completed'])

	if(!ObjectID.isValid(id)){
		return res.status(404).send()
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime()
	}else{
		body.completed = false
		body.completedAt = null
	}

	Todo.findByIdAndUpdate(id, {
		$set: body
	}, {
		new: true
	}).then((todo) => {
		if(!todo){
			return res.status(404).send()
		}

		res.send({todo})
	}).catch((e) => res.status(400).send())


})

app.listen(port, () => {
	console.log(`Iniciado na porta ${port}`)
})

module.exports = {
	app
}