//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')
/*
//pode adicionar objetos de id unicos onde tu quiser desta forma
let obj = new ObjectID()

console.log(obj)

let user = {name: 'Eduardo', age: 22}
//desconstroi um objeto, pegando o parâmetro interno e setando ele como uma variável
let {name} = user

console.log(name)
*/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		//precisa do return pra evitar que continue a executar o restante do programa!
		//Além de evitar o uso da clausula do else
		return console.log('Não foi possivel conectar com o servidor MongoDB')
	}
	console.log('Conectado com o servidor MongoDB')	
	const db = client.db('TodoApp')
/*
	db.collection('Todos').insertOne({
		text: 'Teste do banco de dados',
		completed: false
	}, (err, result) => {
		if(err){
			return console.log('Não foi possível inserir Todo', err)
		}
		console.log(JSON.stringify(result.ops, undefined, 2))
	})

	//o atributo _id pode ser setado na mão
	//ele é gerado através de diversos parâmetros, tornando ele único
	db.collection('Users').insertOne({
		name: 'Eduardo',
		age: 22,
		location: 'Rua Félix da Cunha, 560, Pelotas, RS'
	}, (err, result) => {
		if(err){
			return console.log('Não foi possível inserir usuário', err)
		}
		//console.log(JSON.stringify(result.ops, undefined, 2))
		console.log(result.ops[0]._id.getTimestamp())
	})
	*/
	//encerra a conexão com o servidor
	client.close()
})