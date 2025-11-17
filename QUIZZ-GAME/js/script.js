//DOM Elements

const startScreen=document.getElementById("start-screen")
const quizScreen=document.getElementById("quiz-screen")
const resultScreen=document.getElementById("result-screen")
const startButton=document.getElementById("start-btn")
const questionText=document.getElementById("question-text")
const answersContainer=document.getElementById("answers-container")
const currentQuestionSpan=document.getElementById("current-question")
const totalQuestionSpan=document.getElementById("total-questions")
const scoreSpan=document.getElementById("score")
const finalScoreSpan=document.getElementById("final-score")
const maxScoreSpan=document.getElementById("max-score")
const resultMessage=document.getElementById("result-message")
const restartButton=document.getElementById("restart-btn")
const progressBar=document.getElementById("progress")



const quizQuestions=[
    {
        question:"What is the capital of France?",
        answers:[
            {text:"London",correct:false},
            {text:"Berlin",correct:false},
            {text:"Paris",correct:true},
            {text:"Madrid",correct:false},
        ],
    },

    {
        question:"Which planet is know as the Red Planet?",
        answers:[
            {text:"Venus", correct:false},
            {text:"Mars", correct:true},
            {text:"Jupiter", correct:false},
            {text:"Saturn", correct:false},
        ],
    },

    {
        question:"What's the largest ocean on the Earth?",
        answers:[
            {text:"Athlantic Ocean", correct:false},
            {text:"Indian Ocean", correct:true},
            {text:"Artic Ocean", correct:false},
            {text:"Pacific Ocean", correct:true},
        ],
    },

    {
        question:"Which of these is not a programming language?",
        answers:[
            {text:"Java", correct:false},
            {text:"Python", correct:true},
            {text:"Html", correct:true},
            {text:"Javascript", correct:false},
        ],
    },

    {
        question:"Which of these is not a programming language?",
        answers:[
            {text:"Java", correct:false},
            {text:"Python", correct:true},
            {text:"Html", correct:true},
            {text:"Javascript", correct:false},
        ],
    }
];


//Quiz states Vars

let currentQuestionIndex=0;
let score=0;
let answersDisabled=false

totalQuestionSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;


//Even Listener
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    // reset vars
    currentQuestionIndex=0;
    score=0
    scoreSpan.textContent=score

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}
function showQuestion(){
    answersDisabled=false
    const currentQuestion=quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent=currentQuestionIndex+1

    const progressProcent=(currentQuestionIndex/quizQuestions.length)/100
    progressBar.style.width=progressProcent +"%"

    questionText.textContent=currentQuestion.question

    //todo: explain this in a second

    answersContainer.innerHTML="";
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.textContent=answer.text
        button.classList.add("answer-btn")

        button.dataset.correct=answer.correct

        button.addEventListener("click",selectAnswer)
        answersContainer.appendChild(button)
    })
}

function selectAnswer(event){
    if (answersDisabled==true) return
    answersDisabled=true
    const selectedButton=event.target;
    const isCorrect=selectedButton==="true"

    Array.from(answersContainer.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }else{
            button.classList.add("incorrect")
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent=score
    }

    setTimeout(()=>{
        currentQuestionIndex++;
//Check if there are more question of if the quiz is over
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion()
        }else{
            showResult()
        }
    },1000)
}

function showResult(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent=score;
}


function restartQuiz(){
    console.log("quiz re-started")
}
// hello