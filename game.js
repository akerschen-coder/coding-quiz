//grabs from html
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerEl = document.querySelector('.timer-text')

// all vars to be used and things pushed into 
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []; 
// questions
let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Hypertext Markup Language',
        choice2: 'Hypertext Meetup Logs',
        choice3: 'Hypertext Moblie Language',
        choice4: 'Hippos To Meet Lions',
        answer: 1,
    },
    { 
        question: 'What can arrays hold?',
        choice1: 'My hand',
        choice2: 'Strings',
        choice3: 'Food',
        choice4: 'a fixed number of values of a single type',
        answer: 4,
    },
    { 
        question: 'How do you create an element using JQuery?',
        choice1: '<p>',
        choice2: '$<p>',
        choice3: 'variable = $(<p>)',
        choice4: 'You cant',
        answer: 3,
    },
    { 
        question: 'How can you use css?',
        choice1: 'to open cans',
        choice2: 'to style a html page',
        choice3: 'Makes great banana bread',
        choice4: 'Its a horrible bad thing',
        answer: 2,
    },
    { 
        question: 'Can you do math with javascript?',
        choice1: 'Only on tuesdays',
        choice2: 'only on wednesdays',
        choice3: 'Yes, you can on any day',
        choice4: 'What/s javascript?',
        answer: 3,
    },
    
]
//meant to be changed
const SCORE_POINTS = 15;
const MAX_QUESTIONS = 5; 
var timeLeft = 100;

//timer function 
function countDown() {
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft; 
      if(timeLeft === 0) { 
        clearInterval(timeInterval);
      } 
  
    }, 1000); 
  
    };
//start game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
    countDown(); 
}
// which question to ask
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }
//adds to question counter and pushes to dom 
    questionCounter ++; 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS) * 100}%`
//randomizes number
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex] 
    question.innerText = currentQuestion.question
//choses the dataset number and choude
choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})
availableQuestions.splice(questionsIndex, 1)
acceptingAnswers = true

}
//collected users choice 
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number'];
        //check value if true or false and color it 
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        //increase points
        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }
        // to make the time go down.  
        else {
            timeLeft -= 5;
        }
      

        selectedChoice.parentElement.classList.add(classToApply) 
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 500)
    })
})

// makes number go up and display
incrementScore = num => {
    score += num
    scoreText.innerText = score 
}
startGame();