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

//confiigure body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: '1C44-4D44-WppQ38S',
  resave: false,
  saveUninitialized: true
}));

//configure the expressValidator
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
let word="";
// correctWord.length = wordLetters.length;
for(i=0; i<wordLetters.length; i++){
correctedWord.push("_")};

app.post('/',function(request, response){
  console.log('where are we?');

let guessedLetter= request.body.guessInput;
letters.push(guessedLetter);
  // for(i=0; i<wordLetters.length; i++){
  //   correctedWord[i]="_";
  // }


  for(i=0; i<wordLetters.length; i++){
  if (guessedLetter.split("").length>1){
    errorMsg = "please enter only one letter";
  }else{errorMsg="";}
  if (guessedLetter === wordLetters[i]){

    correctedWord[i] = guessedLetter;

    // correctWord.splice(i, 0, correctedWord[i]);
  }

  }


  console.log(word);
  console.log (correctedWord);
  console.log (wordLetters);
  console.log(guessedLetter);

  // let correctWord =(wordLetters.includes(guessedLetter))
  if (wordLetters.includes(guessedLetter)){
      // apple ++;
      console.log(apple);
      wrongChoice="";

  } else{
     wrongChoice="WRONG!";
     chances--;

    console.log(wrongChoice);
    console.log(chances);
}


// // })
// if (correctedWord !== wordLetters){
//   wrongChoice="";
// }else {
//   wrongChoice="YOU WIN!"
// }
if (chances ===0 ){
  wrongChoice="GAME OVER!"
  correctWord=currentWord;
  response.render('gameover',{words, letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord})
}else{
// for(i=0; i<correctedWord.length; i++){
// if( correctedWord[i] === wordLetters[i]){
//   return apple ++;
// }
// }
// if (apple === wordLetters.lenght){
//     return wrongChoice="YOU WIN!";
// }

// if (correctedWord[i]===""){
//   return correctedWord[i]= "_";
// }
//   // if (correctedWord.includes(guessedLetter)){
  //     apple ++;
  //     console.log(apple);
  // }else{
  //   return wrongChoice="Guess Again!";
  //   return chances--;
  //   console.log(wrongChoice);
  //   console.log(chances);
  //
  // }


  // console.log(request.body)
  // response.render('game', {words, currentWord, correctWord});

  // if (correctedWord !== wordLetters){
  //   wrongChoice="";
  // }else {
  //   wrongChoice="YOU WIN!"
  // }
 //  for(i=0; i<correctedWord.length; i++){
 //    if( correctedWord[i]===wordLetters[i]) {
 //      console.log('win!');
 //      word++;
 //    }else{
 //      console.log("no match")
 //    }
 //  }
 // if (word === wordLetters.lenght){
 //   wrongChoice="YOU WIN!"
 // }
 let similar = correctedWord.every(function(element, i) {
     return element === wordLetters[i];
 });
 //
   if(similar){
     wrongChoice="YOU WIN!"
   }
    response.redirect('/');}

 // response.render('game', {words, currentWord, correctWord});
});
// let completedTodo = todoList.find(function(todo){
//     return todo.id === completedId
//   });
app.get('/', function(request, response){
  response.render('game', {words, letters, correctedWord, currentWord, errorMsg, wrongChoice, chances,correctWord});
  console.log(currentWord)
  // console.log (correctWord);
  console.log (wordLetters);
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
    console.log(currentWord)
    // console.log (correctWord);
    console.log (wordLetters);
    });




app.listen(3000, function(){
  console.log('server started')

});
//
//
// app.post('/', function(req,res){
//
//   if (req.body.letterInput.split('').length === 1 && guessedLetters.includes(req.body.letterInput) === false ){
//     guessedLetters.push(req.body.letterInput);
//     numberOfGuesses -= 1
//     console.log(req.body.letterInput.split(''));
//   }
//
//
//   if(guessedLetters.length > 8){
//     res.redirect('/gameover')
//   }
//
//   let correctLetters = randomWordLetters.map(function(letter){
//     if(guessedLetters.includes(letter)){
//       return letter;
//     }else{
//       return '_';
//     }
//   });
//
//
//   var schema = {
//     'letterInput': {
//       notEmpty: true,
//       isLength: {
//         options: [{
//           max: 1
//         }],
//         errorMessage: 'one letter at a time please'
//       },
//       errorMessage: 'please guess a letter'
//     },
//   };
//   req.assert(schema);
//   req.getValidationResult().then(function(results) {
//
//     if (results.isEmpty()) {
//       res.render('content', {
//         letters: correctLetters,
//         guessed: guessedLetters,
//         numberOfGuesses
//       });
//       // console.log(guessedLetters)
//     } else {
//       res.render('content', {
//         letters: correctLetters,
//         guessed: guessedLetters,
//         numberOfGuesses,
//         errors: results.array()
//       });
//     }
//
//   });
//   let isSame = correctLetters.every(function(element, i) {
//     return element === randomWordLetters[i];
// });
//
//   if(isSame){
//     res.redirect('/youwin')
//   }
// });
//
// app.get('/gameover', function(req, res){
//   req.session.destroy();
//   res.render('gameover')
// })
