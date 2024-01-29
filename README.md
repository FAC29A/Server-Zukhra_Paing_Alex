# Server Project - Microblogging Site
This web application, built with Node.js and Express, allows users to create, edit, and view posts. The application incorporates essential features like posting messages, content moderation using OpenAI API, and editing and deleting posts. The application has been deployed on Fly.io, and you can access it [here](<https://server-zukhra-paing-alex.fly.dev/>).

## Getting Started

1. **Install Dependencies:**
   - No need to install dependencies manually, as the application is deployed.

2. **Access the Application:**
   - Open your web browser and go to the provided link for the deployed application.

## Features

### Posting a New Message

- Access the homepage (`/`) to submit a new post.
- Enter your name (`nickname`) and a message (`text`) in the form.
- Click the "Send" button to submit the post.

### Viewing Posts

- Visit the `/posts` page to see a list of all posted messages by clicking the button "Show posts"
- Each post displays the name, message, and creation timestamp.

### Moderation

- Posts are checked for moderation based on specific criteria using the OpenAI API.
- If a post is flagged, it won't be displayed.


### Editing and Deleting Posts

- Click on "Edit" next to a post to modify its content.
- Click on "Delete" to remove a post.



