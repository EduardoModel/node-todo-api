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
	//o find retorna um ponteiro que aponta para os dados no database, pra não enviar todos pra aplicação e ocupar espaço
	//toArray converte o resultado em um array, e retorna uma promisse
	//argumento do find() é chamado de query(será que tem a ver com o jquerry?)
	//pra buscar pelo ID, tem que criar um novo objeto do tipo ID pra conseguir procurar a informação
	/*
	db.collection('Todos').find({
		_id: new ObjectID('5b0d56ec58a1531228bb6776')
	}).toArray().then((docs) => {
		console.log('Todos')
		console.log(JSON.stringify(docs, undefined, 2))
	}, (err) => {
		console.log('Não foi possível pegar os resultados!', err)
	})
	*/

	/*
	//pra acessar o count pode ser da forma de uma promisse tmb
	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count ${count}`)
	}, (err) => {
		console.log('Não foi possível pegar os resultados!', err)
	})
	*/

	db.collection('Users').find({name: 'Eduardo'}).toArray().then((docs) => {
		console.log('Users')
		console.log(JSON.stringify(docs, undefined, 2))
	}, (err) => {
		console.log('Não foi possível pegar os resultados!', err)
	})


	//encerra a conexão com o servidor
	//client.close()
})