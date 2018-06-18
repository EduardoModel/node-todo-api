const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let password = '123abc!'
/*
//junta o salt e a informação criptografada dentro do hash
bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err,hash) => {
		console.log(hash)
	})
})
*/
let hashedPassword = '$2a$10$fFNNGESNnKcPL7yenxoQO.iSws0NzNSE.pQ5J/QcePj9UWV/JnxAq'

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res)
})

/*
let data = {
	id: 10
}

let token = jwt.sign(data, '123abc') //cria a hash para a informação

console.log(token)

let decoded = jwt.verify(token, '123abc') //verifica se a informação não foi manipulada

console.log('decoded', decoded)
*/
/*
let message = 'Teste para fazer o hashing'
let hash = SHA256(message).toString()

console.log(`Message: ${message}`)
console.log(`Hash: ${hash}`)


let data = {
	id: 4
}

let token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //o somesecret é para garantir que o usuário não mude o id, visando deletar todos de outros usuários!
}


//token.data = 5
//token.hash = SHA256(JSON.stringify(token.data)).toString()


let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

if(resultHash === token.hash){
	console.log('Data não foi modificada')
}else{
	console.log('Data modificado! Não confiável')
}
*/