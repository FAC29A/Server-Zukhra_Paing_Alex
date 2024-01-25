const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('postsPage', {
		title: 'Posts',
		posts: posts,
		sanitize: sanitize,
		values: req.body || {},
	})
})

module.exports = router