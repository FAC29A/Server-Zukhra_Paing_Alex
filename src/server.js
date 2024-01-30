// Load environment variables from .env file
require('dotenv').config()

//const model = require('./model/DBFunctions.js')

const express = require('express')
const server = express()

const { sanitize, moderate, formatListWithAnd } = require('./functions')

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

server.post('/', express.urlencoded({ extended: false }), async (req, res) => {
	const nickname = req.body.nickname
	const message = req.body.message
	const errors = {}

	if (!nickname) {
		errors.nickname = 'Please enter your nickname'
	}

	if (!message) {
		errors.message = 'Please enter a message'
	}

	if (Object.keys(errors).length === 0) {
		// Check for moderation flags
		const flaggedCategories = await moderate(message)
		if (flaggedCategories.length > 0) {
			// Add moderation error
			const formattedCategories = formatListWithAnd(flaggedCategories)
			errors.message = `Post flagged for ${formattedCategories} content. It won't be posted.`
		}
	}

	if (Object.keys(errors).length > 0) {
		// Render form with errors
		res.render('formPage', {
			title: 'New Post',
			sanitize: sanitize,
			values: req.body,
			errors: errors,
		})
	} else {
		// Create and add the post
		const created = Date.now()
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

server.get('/openEdit/:id', (req, res) => {
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

server.post(
	'/edit/:id',
	express.urlencoded({ extended: false }),
	(req, res) => {
		const id = req.params.id
		const index = posts.findIndex((post) => post.id === id)
		if (index !== -1) {
			posts[index].message = req.body.message
			posts[index].created = Date.now()
			res.redirect('/posts')
		} else {
			res.status(404).send('Post not found')
		}
	}
)

server.get('/back', (req, res) => {
	res.redirect('/')
})

server.get('/showPosts', (req, res) => {
	res.redirect('/posts')
})

module.exports = server
