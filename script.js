let questions = [
    {
        "questiontext": "Seit wann gibt es Menschen (Homo sapiens)?",
        "answer1": "30.000 Jahren",
        "answer2": "300.000 Jahren",
        "answer3": "3.000 Jahren",
        "answer4": "3.000.000 Jahren",
        "rightAnswer": 2
    },
    {
        "questiontext": "Welcher ist der zweitgrößte Planet unseres Sonnensystems?",
        "answer1": "Venus",
        "answer2": "Neptun",
        "answer3": "Jupiter",
        "answer4": "Saturn",
        "rightAnswer": 4
    },
    {
        "questiontext": "Wie oft passt Deutschland flächenmäßig in Russland?",
        "answer1": "15",
        "answer2": "33",
        "answer3": "25",
        "answer4": "47",
        "rightAnswer": 4
    },
    {
        "questiontext": "Haben Rosen Stacheln oder Dornen?",
        "answer1": "Stacheln",
        "answer2": "Dornen",
        "answer3": "Ist beides das Gleiche",
        "answer4": "Keines von beiden",
        "rightAnswer": 1
    },
    {
        "questiontext": "Wie groß war der größte Mensch der Welt?",
        "answer1": "3,19m",
        "answer2": "2,44m",
        "answer3": "2,72m",
        "answer4": "2,97m",
        "rightAnswer": 3
    },
    {
        "questiontext": "Wie viele Schritte brauchte Usain Bolt bei seinem Weltrekord über 100m?",
        "answer1": "41",
        "answer2": "48",
        "answer3": "56",
        "answer4": "70",
        "rightAnswer": 1
    }
];

let currentQuestion = 0;
let rightAnswers = 0;
let audioSuccess = new Audio('audio/success.mp3');
let audioFail = new Audio('audio/fail.mp3');


function init() {
    document.getElementById('questionLength').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameOver()) {
        showScore();
    }
    else {
        updateProgessBar();
        showNextQuestion();
    }
}

function gameOver() {
    return currentQuestion >= questions.length;
}

function showScore() {
    document.getElementById('questionContent').style = 'display: none';
    document.getElementById('questionContentScore').style = ''
    document.getElementById('questionContentScore').innerHTML = showScoreTemplate(rightAnswers);

    if (rightAnswers <= 2) {
        document.getElementById('scoreText').innerHTML = `Das war aber nicht gut!`;
    }
    else if (rightAnswers <= 5) {
        document.getElementById('scoreText').innerHTML = `Da ist noch Luft nach oben!`;
    }
    else {
        document.getElementById('scoreText').innerHTML = `Toll, du hast alle Fragen richtig beantwortet!`;
    }
}

function showScoreTemplate(rightAnswers) {
    return `
    <div class="scoreContainer">
        <div class="scoreContent">
            <div>
                <img class="scoreImg" src="img/logo.png" alt="Logo">
            </div>
            <span id="scoreText" class="scoreText"></span>
            <div class="scoreResultContent"><span class="scoreYourResult">Richtige Antworten:</span><span
                    class="scoreResult"><b>${rightAnswers}</b> von <b>${questions.length}</b></span></div>
            <div class="scoreButton"><button onclick="restart()" type="button" class="btn btn-primary">Nochmal
                    spielen</button></div>
            <div>
                <img class="trophy" src="img/tropy.png" alt="Trophäe">
            </div>
        </div>
    </div>`;
}

function showNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('currentCard').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question["questiontext"];
    document.getElementById('answer1').innerHTML = question["answer1"];
    document.getElementById('answer2').innerHTML = question["answer2"];
    document.getElementById('answer3').innerHTML = question["answer3"];
    document.getElementById('answer4').innerHTML = question["answer4"];

    if (currentQuestion == questions.length - 1) {
        document.getElementById('nextQuestion').innerHTML = `Ergebnis anzeigen`
    }
    else { }
}

function updateProgessBar() {
    let percent = currentQuestion / questions.length;

    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style = `width: ${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${question["rightAnswer"]}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).classList.add('bg-success');
        audioSuccess.play();
        rightAnswers++;
    }
    else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
        audioFail.play();
    }
    changeButtonFunctionAfterAnswer();
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return question["rightAnswer"] == selectedQuestionNumber;
}

function changeButtonFunctionAfterAnswer() {
    document.getElementById('nextQuestion').disabled = false;
    document.getElementById('answer1').onclick = "";
    document.getElementById('answer2').onclick = "";
    document.getElementById('answer3').onclick = "";
    document.getElementById('answer4').onclick = "";
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('answer1').onclick = function () { answer('answer1') };
    document.getElementById('answer2').onclick = function () { answer('answer2') };
    document.getElementById('answer3').onclick = function () { answer('answer3') };
    document.getElementById('answer4').onclick = function () { answer('answer4') };
    document.getElementById('nextQuestion').disabled = true;
    resetButtons();
    showQuestion();
}

function resetButtons() {
    document.getElementById('answer1').classList.remove('bg-success');
    document.getElementById('answer1').classList.remove('bg-danger');
    document.getElementById('answer2').classList.remove('bg-success');
    document.getElementById('answer2').classList.remove('bg-danger');
    document.getElementById('answer3').classList.remove('bg-success');
    document.getElementById('answer3').classList.remove('bg-danger');
    document.getElementById('answer4').classList.remove('bg-success');
    document.getElementById('answer4').classList.remove('bg-danger');
}

function restart() {
    currentQuestion = 0;
    rightAnswers = 0;
    document.getElementById('questionContent').style = '';
    document.getElementById('questionContentScore').style = 'display:none';
    init();
}