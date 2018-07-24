# Spelling Bee FrontEnd

https://spelling-bee-frontend.herokuapp.com/

Spelling Bee FrontEnd is a project using javascript, React and CSS. It is a single page application with various views which each fetch data from the Spelling Bee BackEnd /api endpoints.  The homepage view fetches school years, each yearpage view fetches categories, categories pages views fetch lists of either partials (groups of letters which are e.g. prefixes) or lists of words. Individual partial pages fetch lists of words which contain the partial, e.g. words ending in the suffix 'ing' (beginning, forgetting etc).  )(Please note, at the time of writing, data is only available for years 3 & 4). In the practice view, a user can click a button to hear the word spoken and briefly appear on the screen.  The user can then type their spelling into a form and their spelling will appear underneath the form with correct letters in blue, incorrect letters in red. If the whole word is correct, a green tick appears.  If the spelling is incorrect the correct word appears alongside the spelling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

1.  Node 

2.  NPM (Node Package Manager)

### Installing

Below is a step by step guide on how to get the app running in a development environment.

#### 1. Download the project from Github
1. On the command line, from the folder where you wish to store the repository, enter:

```bash
git clone https://github.com/Chenerywoman/FE-PT-Project-Spelling-Bee
```

2. Fork the project from Github by clicking on the Fork button on the top right-hand side of the screen.

#### 2. Install node 

1. To check if you already have node installed, run this command in your terminal:

```bash 
node -v
```

2. If node is not installed, follow the instructions at https://nodejs.org/en/

#### 3. Use NPM

1. Npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.

2. To confirm you have npm installed, run the following command in your terminal:

```bash 
npm -v
```

#### 5. Run NPM install

1. To install all the necessary npm packages to run the project, run this command in your terminal from the root of your project:

```bash 
npm install
```

#### 6. Set up a .env file

1. Set up a .env file in the root of the project

```bash 
touch .env
```
2. Add the following code to the .env file:

**either** (if using the hosted Spelling Bee backend )
```js
REACT_APP_API_URL=https://mighty-hollows-41094.herokuapp.com/api
```

**or** (if using the Spelling Bee backend project on your local machine)
```js
module.exports = 'http://localhost:3000/api';
```

#### 7. Use NPM scripts to run the project

The following script (from the package.json scripts section) can be used in the command line to run the project:

  * To launch the project in a web browser: 
  ```bash 
  npm start
  ```

  * In the browser:
  ```bash
    http://localhost:3001 
  ```

## Built With
Create React App (https://github.com/facebookincubator/create-react-app)
Node: version 9.9.0
NPM: 5.6.0

## Authors
Rachel Chenery 
@Chenerywoman

## Acknowledgments
Massive thanks to my tutors @northcoders, Jac Darby @JacDarby and Anat Dean @AnatDean.