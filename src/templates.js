function home(posts, errors = {}, values = {}) {
	const title = 'Create post'
	const needBack = false
	const content = /*html*/ `
    <h2>New post</h2>
    <form method="POST">
      <p>
        <label for="nickname">Nickname</label>
        <input
          id="nickname"
          name="nickname"
          value="${values.nickname ? sanitize(values.nickname) : ''}"
        >
        ${validation(errors.nickname)}
      </p>
      <p>
        <label for="message">Message</label>
        <label for="message">Message</label>
        <textarea 
        id="message"
        name="message">${
					values.message ? sanitize(values.message) : ''
				}</textarea>
        ${validation(errors.message)}
        </p>
      <button>Send</button>
    </form>
  `
	return layout(title, content, needBack)
}

function postsPage(posts) {
	const needBack = true
	const title = 'All posts'
	const content = `
  <h2>All posts</h2>
    <ul>
      ${posts.map(postItem).join('')}
    </ul>
    `
	return layout(title, content, needBack)
}

function sanitize(string) {
	return string
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}

function validation(message) {
	if (message) {
		return `<span style="color: red">${message}</span>`
	} else {
		return ''
	}
}

function postItem(post) {
	const date = new Date(post.created)
	const prettyDate = date.toLocaleString('en-GB')
	return `
    <li>
      <p>${sanitize(post.message)}</p>
      <p>—${sanitize(post.nickname)} | ${prettyDate}</p>
      <form action="/delete/${post.id}" method="POST">
        <button type="submit">Delete post</button>
      </form>
    </li>
  `
}

function layout(title, content, needBack) {
	var backButton = ``
	if (needBack) {
		backButton = `<button type="submit">Back</button>`
	}

	return /*html*/ `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/normalize.css" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="shortcut icon" type="image/png" href="/favicon.ico?" />
      </head>
      <body>
        ${content}
        ${backButton}
      </body>
    </html>
  `
}

module.exports = { home, postsPage }
