const test = require('node:test')
const assert = require('node:assert')
const server  = require("../src/server.js")


test('First Test', () => {
	assert.equal(1, 1)
})

test('GET / renders the formPage with correct data', async () => {
	const app = server.listen(9876);
  
	try {
	  const response = await fetch('http://localhost:9876');
	  assert.equal(response.status, 200);
  
	  const body = await response.text();
	  
	  // Check for the presence of key elements in the formPage
	  assert.match(body, /<h1>New post<\/h1>/);
	  assert.match(body, /<form method="POST">/);
	  assert.match(body, /<label for="nickname">Your Name<\/label>/);
	  assert.match(body, /<label for="message">Text<\/label>/);
	  assert.match(body, /<button class="right-button">Send<\/button>/);
	  assert.match(body, /<form class="buttonForm" action="\/showPosts" method="GET">/);
	  assert.match(body, /<button type="submit">Show Posts<\/button>/);
  
	  
	  assert.match(body, /value="Anonymous"/); // Assuming 'Anonymous' is the default nickname value
  
	} finally {
	  app.close();
	}
  });

  

