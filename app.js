const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const fs = require ('fs');


const app = express();
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');


app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: '1C44-4D44-WppQ38S',
  resave: false,
  saveUninitialized: true
}));

app.use(expressValidator());

let currentWord = words[Math.floor(Math.random() * words.length)];
let wordLetters=currentWord.split("");
let correctedWord=[];
let letters=[];
let errorMsg="";
let chances = 8;
let wrongChoice="";
let correctWord="";
let word;


for(i=0; i<wordLetters.length; i++){
correctedWord.push("_")};

app.post('/',function(request, response){

let guessedLetter= request.body.guessInput;

  for(i=0; i<wordLetters.length; i++){
    if (guessedLetter.split("").length>1){
      errorMsg = "please enter only one letter";
    }else{
      errorMsg="";
    }
    if (guessedLetter === wordLetters[i]){
      correctedWord[i] = guessedLetter;
    }
  }
  if(wordLetters.includes(guessedLetter)===false&& letters.includes(request.body.guessInput) === false && guessedLetter.split("").length === 1){
    chances--;
  letters.push(request.body.guessInput)
  }

  if ( letters.includes(request.body.guessInput) === false && guessedLetter.split("").length  === 1 && guessedLetter !== "" ) {
      letters.push(request.body.guessInput)
  }

if (chances === 0 ){

  correctWord=currentWord;

response.render('gameover',{ letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord})
}else{
    let a= ""
    correctedWord.forEach(function(element){
      a += element;
      if (a === currentWord){
       wrongChoice="YOU WIN!"
       word = "YOU WIN!"
      }
    });
    response.redirect('/')
  }
});

app.get('/', function(request, response){
  response.render('game', { word, words, letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord});
  });

app.post('/tryagain', function(request, response){
  let gameover= request.body.button;
  if (gameover===""){
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordLetters=currentWord.split("");
  correctedWord=[];
  letters=[];
  errorMsg="";
  chances = 8;
  wrongChoice="";
  apple=0;
  correctWord=""
  word=""

     for(i=0; i<wordLetters.length; i++){
     correctedWord.push("_")};
    }
    response.redirect('/')
});

app.get('/', function(request, response){
  response.render('game', {word, words, letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord});

});

app.listen(3000, function(){
  console.log('server started')

});
