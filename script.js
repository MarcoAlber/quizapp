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

function init() {
    document.getElementById('questionLength').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('questiontext').innerHTML = question["questiontext"];
    document.getElementById('answer1').innerHTML = question["answer1"];
    document.getElementById('answer2').innerHTML = question["answer2"];
    document.getElementById('answer3').innerHTML = question["answer3"];
    document.getElementById('answer4').innerHTML = question["answer4"];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${question["rightAnswer"]}`;

    if (question["rightAnswer"] == selectedQuestionNumber) {
        document.getElementById(selection).classList.add('bg-success');
    }
    else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
    }
    document.getElementById('nextQuestion').disabled = false;
}