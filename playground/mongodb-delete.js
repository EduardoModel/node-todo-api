//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		//precisa do return pra evitar que continue a executar o restante do programa!
		//Além de evitar o uso da clausula do else
		return console.log('Não foi possivel conectar com o servidor MongoDB')
	}
	console.log('Conectado com o servidor MongoDB')	
	const db = client.db('TodoApp')

	/*
	//deleteMany deleta todos que batem com o objeto passado como parâmetro
	db.collection('Todos').deleteMany({text: 'Almoço'}).then((result) => {
		console.log(result)
	})
	*/

	/*
	//deleteOne: deleta apenas um que bate com o objeto passado como parâmetro
	db.collection('Todos').deleteOne({text: 'Almoço'}).then((result) => {
		console.log(result)
	})
	*/

	/*
	//findOneAndDelete: além de remover o elemento, retorna ele na promisse
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result)
	})
	*/

	
	//desafio
	db.collection('Users').deleteMany({name: 'Eduardo'}).then((result) => {
		console.log(result)
	})

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('5b0d5869fd956912a7ccf1e2')
	}).then((result) => {
		console.log(result)
	})



	//encerra a conexão com o servidor
	//client.close()
})