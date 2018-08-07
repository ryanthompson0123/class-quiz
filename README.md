Class Quiz
==================

Written in React-Redux, the project aims to get a multiplayer in-class quiz game up and running as quick as possible.

## Requirements

* [NodeJS](http://nodejs.org)

## Developer Tools

* [Visual Studio Code](https://code.visualstudio.com)

## Information

The project contains three components

* class-quiz-client: A mobile-web app for participants who are taking quizzes.

* class-quiz-proctor: A web app for the person who is proctoring quizzes.

* class-quiz-server: The server component that ties everything together

## Building Class Quiz master branch from source

From the command line, in the root of the cloned git repo:

```bash
npm install

npm start
```

## Running the application

After running npm start, three services will be spawned in the background.

* The main server component runs in the background on port 8090.

* The proctor component listens on port 8080 and is only available on localhost.

* The client component listens on port 8070 and is available to the local network.

## Features

* The proctor can create, edit, and delete quizzes, as well as start and run quizzes.

* Clients can hit port 8070 on their mobile devices to enter their names and join the quiz.

* Quizzes are 'grand-prix' style events that display participant answers and response times. Participants earn points based on their response time and correct answers, and are ranked at the end of the quiz.

## Remaining Items

* Several UI tweaks and improvements as suggested in class.

* In-quiz charts need to be implemented on the stats screen and results screen.

* Functionality needs to be implemented for creating a new quiz.

* Clients that lose connection (network drop or device going to sleep) can't reconnect.

* Need to add timers before starting the quiz and between questions.
