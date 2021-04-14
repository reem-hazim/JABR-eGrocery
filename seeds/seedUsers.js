const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/abrajTest', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>{
		console.log("Mongodb Connection open!")
	})
	.catch(err => {
		console.log("Error connecting to MongoDB")
		console.log(err)
	})

const seedUsers = [
	{
		firstName: 'Emma',
		lastName: 'Watson',
		email: 'hello@gmail.com',
		password: 'hello',
	},
	{
		firstName: 'Harry',
		lastName: 'Potter',
		email: 'wow@yahoo.com',
		password: 'wow',
	},
	{
		firstName: 'Reem',
		lastName: 'Hazim',
		email: 'reem.hazim@nyu.edu',
		password: 'reem'
	},
	{
		firstName: 'Joseph',
		lastName: 'Hong',
		email: 'joseph.hong@nyu.edu',
		password: 'joseph',
	},
	{
		firstName: 'Armaan',
		lastName: 'Agrawal',
		email: 'armaan.agrawal@nyu.edu',
		password: 'armaan',
	},
	{
		firstName: 'Brian',
		lastName: 'Kim',
		email: 'brian.kim@nyu.edu',
		password: 'brian',
	}
]


const hashAndSaveUsers = async ()=>{
	for (let user of seedUsers){
		newPass = await bcrypt.hash(user.password, 12);
		user.password = newPass;
	}

	User.insertMany(seedUsers)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})
}

hashAndSaveUsers();
