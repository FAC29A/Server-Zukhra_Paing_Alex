const express = require('express')
const server = express()

const { sanitize } = require('./functions')

//Set view engine to EJS
server.set('view engine', 'ejs')

//For the ID creation
const { v4: uuidv4 } = require('uuid')

// Serve static files from the 'public' directory
server.use(express.static('public'))

const posts = []

server.get('/', (req, res) => {
	res.render('formPage', {
		title: 'New Post',
		sanitize: sanitize,
		values: req.body || {},
		errors: {},
	})
})

server.get('/posts', (req, res) => {
	res.render('postsPage', {
		title: 'Posts',
		posts: posts,
		sanitize: sanitize,
		values: req.body || {},
	})
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
		//const body = home(posts, errors, req.body)
		res.render('formPage', {
			title: 'New Post',
			sanitize: sanitize,
			values: req.body || {},
			errors: errors,
		})
		//res.status(400).send(body)
	} else {
		const created = Date.now()
		//Create a random unique ID
		const id = uuidv4()
		posts.push({ nickname, message, created, id })
		res.redirect('/posts')
	}
})

server.get('/delete/:id', (req, res) => {
	const id = req.params.id
	const index = posts.findIndex((post) => post.id.toString() === id)
	if (index !== -1) {
		posts.splice(index, 1)
	}
	res.redirect('/posts')
})

server.get('/edit/:id', (req, res) => {
	const id = req.params.id
	const post = posts.find((post) => post.id === id)

	if (post) {
		res.render('singlePost', {
			title: 'Edit Post',
			post: post,
			sanitize: sanitize,
		})
	} else {
		res.status(404).send('Post not found')
	}
})

server.post('/back', (req, res) => {
	res.redirect('/')
})

server.post('/showPosts', (req, res) => {
	res.redirect('/posts')
})

module.exports = server
