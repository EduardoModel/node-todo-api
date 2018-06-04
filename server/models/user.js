let mongoose = require('mongoose')

let User = mongoose.model('Users', {
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 1
	},
	password: {
		type: String
	}
})

module.exports = {User}