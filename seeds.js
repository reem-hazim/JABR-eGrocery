const mongoose = require('mongoose');
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
		email: 'hello@gmail.com',
		password: 'hello',
	},
	{
		email: 'wow@yahoo.com',
		password: 'wow',
	},
	{
		email: 'reem.hazim@nyu.edu',
		password: 'reem'
	},
	{
		email: 'joseph.hong@nyu.edu',
		password: 'joseph',
	},
	{
		email: 'armaan.agrawal@nyu.edu',
		password: 'armaan',
	},
	{
		email: 'brian.kim@nyu.edu',
		password: 'brian',
	}
]

User.insertMany(seedUsers)
.then(res => {
	console.log(res);
})
.catch(err => {
	console.log(err);
})