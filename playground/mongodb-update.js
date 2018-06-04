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
	
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5b0ddeb0eb40d50f8c62d2dd")
	}, {
		$set: {
			name: 'Eduardo',
			location: 'Pelotas'
		},
		$inc: {
			age: 1
		},

	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result)
	})





	/*
	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("5b0ddb193318b2d89fea712f")
	}, {
		$set: { //o $set é um operador de update, pois se colocasse o valor diretamente, apenas duplicaria o campo dentro do objeto da coleção!
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result)
	})
	*/
	//encerra a conexão com o servidor
	client.close()
})