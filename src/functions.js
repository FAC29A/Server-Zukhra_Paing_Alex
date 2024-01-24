// function home(errors = {}, values = {}) {
// 	const title = 'Create post'
// 	const needBack = false
// 	const content = /*html*/ `
//     <h1>New post</h1>
//     <form method="POST">
//       <p>
//         <label for="nickname">Your Name</label>
//         <input
//           id="nickname"
//           name="nickname"
//           value="${values.nickname ? sanitize(values.nickname) : ''}"
//         >
//         ${validation(errors.nickname)}
//       </p>
//       <p>
//         <label for="message">Text</label>
//         <textarea
//         id="message"
//         name="message">${
// 					values.message ? sanitize(values.message) : ''
// 				}</textarea>
//         ${validation(errors.message)}
//       </p>
//       <button class="right-button">Send</button>
//     </form>
//   `
// 	return layout(title, content, needBack)
// }

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

module.exports = { sanitize, validation }
