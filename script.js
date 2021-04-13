const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');

const quizQuestionElement = document.querySelector('#quiz__question');
const questionElement = document.querySelector('#question');
const answersBtnsElement = document.querySelector('#answers-btns');
const resultElement = document.querySelector('#result')
const progress = document.querySelector('.progress')
const progressText = document.querySelector('.progressText')
const progressBarFull = document.querySelector('.progress__Bar__full');
const scoreboardBtn = document.querySelector('.scoreboard-btn');
const scoreboardBtn2 = document.querySelector('.scoreboard-btn2');
const random = document.querySelector('#random')
const removeScoreBoard = document.querySelector('#remove')
const removeSaveName = document.querySelector('#remove2')
const saveName = document.querySelector('.saveName')
const playerName = document.querySelector('#name')
const playersTable = document.querySelector('#playersTable')
const submitName = document.querySelector('#submitName')
let questions = [];
let index;
let score = 0;
let questionCounter = 0;

// Fetching data to questions array
fetch("questions.json")
    .then(response => response.json())
    .then((data) => questions.push(...data));

// Functions 
function startGame() {
    scoreboardBtn.classList.add('randomHide')
    questionCounter = 0;
    progressBarFull.style.width = '0%'
    progress.classList.remove('hide');
    startBtn.classList.add('hide');
    resultElement.classList.add('hide');
    score = 0;
    quizQuestionElement.classList.remove('hide');
    index = 0;
    setNexTQuestion();
}

function setNexTQuestion() {
    resetState();
    showQuestion(questions[index]);
}
function selectAnswer(e) {
    let correct = e.target.dataset.correct;
    if(correct) {
        e.target.classList.add('correct');
        e.target.innerHTML += ` <i class='fas fa-check-circle'></i>`;
        score++;
    } else {
        e.target.classList.add('wrong');
        e.target.innerHTML += ` <i class="fas fa-times-circle"></i>`;
    }
    // Progress Bar 
    progress.classList.remove('hide')
    progressBarFull.style.width = `${(questionCounter/questions.length) * 100}%`;

    // Disabled buttons
    const allBtns = document.getElementsByClassName('btn');
    Array.from(allBtns).forEach(btn => {
        if(btn != startBtn && btn != nextBtn && btn != scoreboardBtn) {
            btn.style.cursor = 'not-allowed'
            return btn.disabled = true
        }
    })

    if (questions.length > index + 1) {
        nextBtn.classList.remove('hide');
      } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
        resultElement.classList.remove('hide');
        saveName.classList.remove('hide');
        if(scoreboardBtn.disabled = true) {
            scoreboardBtn.disabled = false;
        }
    // Results     
    if(score === questions.length) {
            resultElement.classList.remove('result1')
            resultElement.classList.add('result2')
            resultElement.innerText = `CONGRATULATIONS! Correct answers: ${score}/${questions.length} questions`;
    }else {
            resultElement.classList.remove('result2')
            resultElement.classList.add('result1')
            resultElement.innerText = `Correct answers: ${score}/${questions.length} questions. TRY ONE MORE TIME!`;
        }
        
      }
}
function showQuestion(question) {
    questionCounter ++
    progressText.innerText = `Question ${questionCounter}/${questions.length}`;
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = answer.text;
if(answer.correct) {
    button.dataset.correct = answer.correct
};
button.addEventListener('click', selectAnswer)
answersBtnsElement.appendChild(button);
    });
}
function resetState() {
    nextBtn.classList.add('hide')
    while (answersBtnsElement.firstChild) {
        answersBtnsElement.removeChild(answersBtnsElement.firstChild);
      }
}
function showNextQuestion() {
    index ++;
    setNexTQuestion();
}
function showScoreBoard() {
    saveName.classList.add('hide')
    random.classList.remove('randomHide')
}
function removeBoard() {
    random.classList.add('randomHide');
    
}
function removeSave() {
    saveName.classList.add('randomHide');
}
// let playersList = JSON.parse(localStorage.getItem('playersList')) || [];
// let player = {
//     name: playerName.value,
//     score: score
// }
// playersList.push(player);
// localStorage.setItem('playersList', JSON.stringify(playersList));


let playersList = JSON.parse(localStorage.getItem("usersList")) || [];
function getPlayerInfo() {
    let player = {
        name: playerName.value,
        score: score
    }
    playersList.push(player)
    let myJson = JSON.stringify(playersList);
    localStorage.setItem('scoreboard', myJson);
    showUsers()
}
function showUsers() {
     output.innerHTML = playersArray.map(player => {
        return `
        <tr>
            <td>${player.name}</td>
            <td>${player.score}</td>
        </tr>
        `
    }).join("");
}
// Events
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', showNextQuestion)
scoreboardBtn.addEventListener('click', showScoreBoard);
scoreboardBtn2.addEventListener('click', showScoreBoard);
removeScoreBoard.addEventListener('click', removeBoard);
removeSaveName.addEventListener('click', removeSave);
submitName.addEventListener('click', getPlayerInfo)

// showUsers(playersList, playersTable);