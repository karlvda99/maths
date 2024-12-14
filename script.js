const startBtn = document.getElementById('startBtn');
const equationEl = document.getElementById('equation');
const answerInput = document.getElementById('answer');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');
const retryBtn = document.getElementById('retryBtn');
const startOverBtn = document.getElementById('startOverBtn');
const numberList = document.getElementById('numberList');
const introText = document.getElementById('introText');
const numbers = document.querySelectorAll('.number');

let timer = 0;
let interval;
let currentEquation;
let correctAnswers = 0;
let currentQuestion = 1;
let startTime;

startBtn.addEventListener('click', startGame);
retryBtn.addEventListener('click', restartGame);
startOverBtn.addEventListener('click', restartGame);

function startGame() {
    // Verberg de intro tekst en de startknop
    introText.style.display = 'none';
    startBtn.style.display = 'none';
    
    // Toon de getallenlijst en de invoervelden
    numberList.style.display = 'block'; 
    answerInput.style.display = 'inline-block';
    equationEl.style.display = 'block';
    timerEl.style.display = 'inline-block'; 
    
    // Toon de "Start Over" knop zodra de game begint
    startOverBtn.style.display = 'inline-block';
    
    correctAnswers = 0;
    currentQuestion = 1;
    resultEl.textContent = '';
    answerInput.value = '';
    startTime = Date.now();
    startTimer();
    generateEquation();

    answerInput.focus();
}

function startTimer() {
    interval = setInterval(() => {
        timer = (Date.now() - startTime) / 1000;
        timerEl.textContent = `Timer: ${timer.toFixed(2)} seconds`;
    }, 10);
}

function stopTimer() {
    clearInterval(interval);
}

function generateEquation() {
    const num1 = Math.floor(Math.random() * 11);
    const num2 = Math.floor(Math.random() * 11);
    const answer = num1 * num2;
    equationEl.textContent = `${num1} x ${num2}`;
    currentEquation = { equation: `${num1} x ${num2}`, answer };
}

answerInput.addEventListener('input', () => {
    const userAnswer = parseFloat(answerInput.value);
    if (userAnswer === currentEquation.answer) {
        correctAnswers++;
        document.getElementById(`num${currentQuestion}`).classList.add('correct'); // Markeer het nummer als correct
        answerInput.value = '';
        currentQuestion++;

        // Maak de placeholder leeg vanaf vraag 2
        if (currentQuestion > 1) {
            answerInput.placeholder = ''; // Verwijder de placeholder tekst
        }

        if (correctAnswers === 10) {
            stopTimer();
            displayRetryButton();
        } else {
            generateEquation();
        }
    }
});

function displayRetryButton() {
    equationEl.style.display = 'none';
    answerInput.style.display = 'none';
    timerEl.style.display = 'none';
    retryBtn.style.display = 'inline-block';
    startOverBtn.style.display = 'none'; // Verberg de "Start Over" knop wanneer het spel is voltooid
    numberList.style.display = 'none';
    resultEl.textContent = `You solved the quiz in ${timer.toFixed(2)} seconds.`;
}

function restartGame() {
    // Reset alles
    retryBtn.style.display = 'none';
    startOverBtn.style.display = 'none'; // Verberg "Start Over" knop wanneer terug naar startscherm
    numberList.style.display = 'none';
    numberList.style.display = 'none';
    answerInput.style.display = 'none';
    equationEl.style.display = 'none';
    timerEl.style.display = 'none';
    // Verberg de "Start Over" knop bij het starten van een nieuw spel
    startOverBtn.style.display = 'none';
    
    startBtn.style.display = 'inline-block';
    introText.style.display = 'block'; // Herstel de intro tekst
    resultEl.textContent = '';
    correctAnswers = 0;
    currentQuestion = 1;
    numbers.forEach(num => num.classList.remove('correct')); // Verwijder de 'correct' klasse
    clearInterval(interval); // Stop de timer bij het herstarten
    timer = 0;
    timerEl.textContent = `Timer: 0.00 seconds`; // Reset de timer
}
