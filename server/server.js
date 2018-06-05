let express = require('express')
let bodyParser = require('body-parser')


let {mongoose} = require('./db/mongoose.js')
let {Todo} = require('./models/todo.js')
let {User} = require('./models/user.js')

let app = express()


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




app.listen(3000, () => {
	console.log('Iniciado na porta 3000')
})

module.exports = {
	app
}