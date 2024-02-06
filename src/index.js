const server = require('./server.js')

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0' // Listen on all network interfaces

server.listen(PORT, HOST, () => {
	console.log(`Listening at http://${HOST}:${PORT}`)
})
