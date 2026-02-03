// Array of questions - you can add or remove questions here
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"],
        correct: 0
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the quiz
function startQuiz() {
    shuffledQuestions = shuffleArray([...questions]);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('score-text').textContent = `Score: ${score} / ${shuffledQuestions.length}`;
    showQuestion();
}

// Display current question
function showQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const question = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach((button, index) => {
        if (index === question.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });
    
    if (selectedIndex === question.correct) {
        score++;
    }
    
    document.getElementById('score-text').textContent = `Score: ${score} / ${shuffledQuestions.length}`;
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        document.getElementById('restart-btn').style.display = 'inline-block';
    }
}

// Go to next question
function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-btn').style.display = 'none';
    showQuestion();
}

// Initialize the quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
    
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('restart-btn').addEventListener('click', startQuiz);
});