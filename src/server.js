const express = require('express')
const server = express()
const { home } = require('./templates.js')

//For the ID creation
const { v4: uuidv4 } = require('uuid')

// Serve static files from the 'public' directory
server.use(express.static('public'))

const posts = []

server.get('/', (req, res) => {
	const body = home(posts)
	res.send(body)
})

server.post('/', express.urlencoded({ extended: false }), (req, res) => {
	const nickname = req.body.nickname
	const message = req.body.message
	const errors = {}
	if (!nickname) {
		errors.nickname = 'Please enter your nickname'
	}
	if (!message) {
		errors.message = 'Please enter a message'
	}
	if (Object.keys(errors).length) {
		const body = home(posts, errors, req.body)
		res.status(400).send(body)
	} else {
		const created = Date.now()
		//Create a random unique ID
		const id = uuidv4()
		posts.push({ nickname, message, created, id })
		res.redirect('/')
	}
})

server.post('/delete/:id', (req, res) => {
	const id = req.params.id
	const index = posts.findIndex((post) => post.id.toString() === id)
	if (index !== -1) {
		posts.splice(index, 1)
	}
	res.redirect('/')
})

module.exports = server
