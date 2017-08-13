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
let wordLetters=currentWord.split("");//split word into letters
let correctedWord=[];
let letters=[];
let errorMsg="";
let chances = 8;
let wrongChoice="";
let apple=0;
let correctWord="";
let word=0;
let a= ""

for(i=0; i<wordLetters.length; i++){
correctedWord.push("_")};

app.post('/',function(request, response){



let guessedLetter= request.body.guessInput;





// letters.push(guessedLetter);
// letters.forEach(function(element){
//   if (guessedLetter===element){
//     word++
//     console.log(word);
//   }
// })
// correctedWord.forEach(function(element){
//    a += element;
// })
// if (a === currentWord){
//   wrongChoice="YOU WIN!"
// }
// console.log(a)
// letters.forEach(function(element){
//   if (guessedLetter === element){
//      letters.splice(element, 1);
//   }
// })
// for(var i = letters.length - 1; i >= 0; i--) {
//     if(array[i] === guessedLetter) {
//        letters.splice(i, 1);
//     }
// }

  for(i=0; i<wordLetters.length; i++){
  if (guessedLetter.split("").length>1){
    errorMsg = "please enter only one letter";
  }else{errorMsg="";}
  if (guessedLetter === wordLetters[i]){
    correctedWord[i] = guessedLetter;
   }
  }
  if(wordLetters.includes(guessedLetter)===false&& letters.includes(request.body.guessInput) === false){
    chances--;
  letters.push(request.body.guessInput)
  }

  if ( letters.includes(request.body.guessInput) === false){
      letters.push(request.body.guessInput)
    }
  //  } else{
  //    wrongChoice="";

         // letters.push(request.body.guessInput);




if (chances ===0 ){
  wrongChoice="GAME OVER!"


  response.render('gameover',{ letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord})
}



   correctedWord.forEach(function(element){
      a += element;

   })
     console.log(a)
   if (a === currentWord){
     wrongChoice="YOU WIN!"
   }



  //  wordLetters.forEach(function(element){
  //  if (element !== guessedLetter ){
  //    chances--;
  //    wrongChoice="WRONG!";
  //  }
  //  })

  //  if (request.body.guessInput.split('').length === 1 && letters.includes(request.body.guessInput) === true ){
  //   word++
  //  }else{
   //
   //
  //     letters.push(request.body.guessInput);
  //     chances -=1;
     //  console.log(request.body.letterInput.split(''));

    // if (letters.push(request.body.guessInput)===true){
    //   chances --;
    //   wrongChoice="WRONG!";
    // }
  //  for (i=0; i<letters.length; i++){
  //    if (guessedLetter === letters[i]){
  //      chances++;
  //    }
  //  }
    response.redirect('/')

});

app.get('/', function(request, response){
  response.render('game', {words, letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord});
  });

app.post('/tryagain', function(request, response){
  let gameover= request.body.button;
  if (gameover===""){
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordLetters=currentWord.split("");//split word into letters
  correctedWord=[];
  letters=[];
  errorMsg="";
  chances = 8;
  wrongChoice="";
  apple=0;
  correctWord=""

     for(i=0; i<wordLetters.length; i++){
     correctedWord.push("_")};
    }
    response.redirect('/')
  });

  app.get('/', function(request, response){
    response.render('game', {words, letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord});

    });

app.listen(3000, function(){
  console.log('server started')

});
