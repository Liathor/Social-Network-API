![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# Social Network API

## Description
An API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. 

## Table Of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contribution Guidelines](#contribution)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation
Make sure you have MongoDB installed and working on your computer.  Install the Social Network API files. Open the application in a terminal and run "npm i", then run "npm start" to start the application.

## Usage
You can test the different API routes in a program like Insomnia. The different routes to use are as follows:

### /api/users
  GET all users<br>
  GET a single user by its _id and populated thought and friend data<br>
  POST a new user (note that the examples below are just sample data):<br> 
  &ensp;{<br>
  &ensp;&ensp;"username": "misha",<br>
  &ensp;&ensp;"email": "misha@email.com"<br>
  &ensp;}<br>
  PUT to update a user by its _id<br> 
  DELETE to remove user by its _id

### /api/users/:userId/friends/:friendId
  POST to add a new friend to a user's friend list<br>
  DELETE to remove a friend from a user's friend list<br>

### /api/thoughts
  GET to get all thoughts<br> 
  GET to get a single thought by its _id<br> 
  POST to create a new thought. (note that the examples below are just sample data):<br> 
  &ensp;  {  
  &ensp;&ensp;    "thoughtText": "Here's a cool thought...",  
  &ensp;&ensp;    "username": "misha",  
  &ensp;  }  
  PUT to update a thought by its _id<br> 
  DELETE to remove a thought by its _id<br> 

### /api/thoughts/:thoughtId/reactions
  POST to create a reaction stored in a single thought's reactions array field  
  DELETE to pull and remove a reaction by the reaction's reactionId value

![Users and thoughts](./Assets/18-nosql-homework-demo-01.gif)
![Users and thoughts by id](./Assets/18-nosql-homework-demo-02.gif)
![User Post, Put, Delete](./Assets/18-nosql-homework-demo-03.gif)
![Friends APIs](./Assets/18-nosql-homework-demo-04.gif)

### Walkthrough Video
Please use the following link to view a walkthrough video of the application in action:<br>
[Social Network API Walkthrough](https://drive.google.com/file/d/1VXdFuTNk3TzYaL81l78F9jPxPq7Vycy2/view)

## License
Distributed under the MIT. Visit [MIT](https://opensource.org/licenses/MIT) for more information.

## Contribution Guidelines
None

## Tests
Insomnia testing and Visual Studio Code

## Questions
Feel free to reach out to me if you have any questions, or if you'd like to find out what else I've worked on. My details are as follows:  
  Github: https://github.com/Liathor  
  Email: dyermisha@gmail.com  
