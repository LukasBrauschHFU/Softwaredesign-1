"use strict";
class Question {
    constructor(_questionText, _type) {
        this.questionText = _questionText;
        this.type = _type;
    }
}
class YesNoQuestion extends Question {
    constructor(_questionText, _isAnswerYes) {
        super(_questionText, "YesNoQuestion");
        this.isAnswerYes = _isAnswerYes;
    }
    compareWithUserAnswer(_userAnswer) {
        if (_userAnswer == "YES" && this.isAnswerYes)
            return true;
        else
            return false;
    }
    toString() {
        return this.questionText + " (YES/NO)";
    }
}
class EstimateQuestion extends Question {
    constructor(_questionText, _upperLimit, _lowerLimit) {
        super(_questionText, "EstimateQuestion");
        this.upperLimit = _upperLimit;
        this.lowerLimit = _lowerLimit;
    }
    compareWithUserAnswer(_userAnswer) {
        let answerAsNumber = parseInt(_userAnswer);
        if (answerAsNumber >= this.lowerLimit && answerAsNumber <= this.upperLimit)
            return true;
        else
            return false;
    }
    toString() {
        return this.questionText + " (Zahl)";
    }
}
class MultipleChoiceQuestion extends Question {
    constructor(_questionText, _possibleAnswers) {
        super(_questionText, "MulitpleChoiceQuestion");
        this.possibleAnswers = _possibleAnswers;
    }
    validateNewQuestion() {
        if (this.countCorrectAnswers() <= 0) {
            this.possibleAnswers[0].IsAnswerCorrect = true;
        }
    }
    countCorrectAnswers() {
        let correctAnswers = 0;
        for (let i = 0; i < this.possibleAnswers.length; i++) {
            if (this.possibleAnswers[i].getIsAnswerCorrect)
                correctAnswers++;
        }
        return correctAnswers;
    }
    compareWithUserAnswer(_userAnswers) {
        let areUserAnswersCorrect = false;
        let userAnswerAsArray = _userAnswers.split(",").map(function (_item) {
            if (isNaN(parseInt(_item)) || parseInt(_item) <= 0)
                return 500;
            else
                return parseInt(_item) - 1;
        });
        if (userAnswerAsArray.length != this.countCorrectAnswers())
            return false;
        if ((new Set(userAnswerAsArray)).size !== userAnswerAsArray.length)
            return false;
        else {
            for (let i = 0; i < userAnswerAsArray.length; i++) {
                if (userAnswerAsArray[i] > this.possibleAnswers.length - 1)
                    return false;
                if (this.possibleAnswers[userAnswerAsArray[i]].getIsAnswerCorrect)
                    areUserAnswersCorrect = true;
                else
                    return false;
            }
            return areUserAnswersCorrect;
        }
    }
    toString() {
        let questionAsOneString = this.questionText + "\n";
        for (let i = 0; i < this.possibleAnswers.length; i++) {
            questionAsOneString += (i + 1) + ". " + this.possibleAnswers[i].answerText + "\n";
        }
        return questionAsOneString + "\n Geben Sie die Nummern der Antworten ein, die Sie für korrekt halten. (Bsp: 1,3)";
    }
}
class FreeTextQuestion extends Question {
    constructor(_questionText, _answerText) {
        super(_questionText, "FreeTextQuestion");
        this.answerText = _answerText;
    }
    compareWithUserAnswer(_userAnswer) {
        if (_userAnswer == this.answerText)
            return true;
        else
            return false;
    }
    toString() {
        return this.questionText + " (Geben Sie die Antwort als Text ein)";
    }
}
class Answer {
    constructor(_answerText, _isAnswerCorrect) {
        this.answerText = _answerText;
        this.isAnswerCorrect = _isAnswerCorrect;
    }
    get getIsAnswerCorrect() {
        return this.isAnswerCorrect;
    }
    set IsAnswerCorrect(_isAnswerCorrect) {
        this.isAnswerCorrect = _isAnswerCorrect;
    }
}
let questions = [];
let questionsCache = [];
let correctAnswers = 0;
let questionsLength;
startQuiz();
async function startQuiz() {
    console.log("Start Load");
    let data = await load("./questions.json");
    console.log("Done Load");
    console.log("Data: " + data);
    getUserChoice();
}
async function load(_filename) {
    console.log("Start Fetch");
    let response = await fetch("./questions.json");
    let text = await response.text();
    let jsonArray = JSON.parse(text);
    for (let i = 0; i < jsonArray.length; i++) {
        switch (jsonArray[i].type) {
            case "YesNoQuestion":
                questions[i] = new YesNoQuestion(jsonArray[i].questionText, jsonArray[i].isAnswerYes);
                break;
            case "EstimateQuestion":
                questions[i] = new EstimateQuestion(jsonArray[i].questionText, jsonArray[i].upperLimit, jsonArray[i].lowerLimit);
                break;
            case "MultipleChoiceQuestion":
                let questionText = jsonArray[i].questionText;
                let newMultipleChoiceQuestion = new MultipleChoiceQuestion(questionText, []);
                for (let j = 0; j < jsonArray[i].possibleAnswers.length; j++) {
                    let answerText = jsonArray[i].possibleAnswers[j].answerText;
                    let isAnswerCorrect = jsonArray[i].possibleAnswers[j].isAnswerCorrect;
                    newMultipleChoiceQuestion.possibleAnswers.push(new Answer(answerText, isAnswerCorrect));
                }
                questions[i] = newMultipleChoiceQuestion;
                break;
            default:
                questions[i] = new FreeTextQuestion(jsonArray[i].questionText, jsonArray[i].answerText);
                break;
        }
    }
    questionsCache = Array.from(questions);
    questionsLength = questions.length;
}
function save(_content, _filename) {
    let blob = new Blob([_content], { type: "text/plain" });
    let url = window.URL.createObjectURL(blob);
    //*/ using anchor element for download
    let downloader;
    downloader = document.createElement("a");
    downloader.setAttribute("href", url);
    downloader.setAttribute("download", _filename);
    document.body.appendChild(downloader);
    downloader.click();
    document.body.removeChild(downloader);
    window.URL.revokeObjectURL(url);
}
function getUserChoice() {
    let choice = parseInt(prompt("1. Bestehende Frage beantworten. \n2. Neue Frage hinzufügen \n3. Programm beenden \n( Wählen Sie 1,2 oder 3.)"));
    if (isNaN(choice) || choice > 3 || choice < 1)
        choice = 4;
    switch (choice) {
        case 1:
            if (questions.length > 0)
                askQuestion();
            else {
                console.log("Alle Fragen wurden beantwortet");
                console.log("Richtig beantwortete Fragen: " + correctAnswers + " von " + questionsLength);
                save(JSON.stringify(questionsCache), "questions.json");
            }
            break;
        case 2:
            generateNewQuestion();
            questionsLength++;
            break;
        case 3:
            console.log("Sie haben " + correctAnswers + " von " + questionsLength + "Fragen richtig beantwortet.");
            save(JSON.stringify(questionsCache), "questions.json");
            break;
        default:
            console.log("Diese Eingabe wird nicht unterstütz.");
            getUserChoice();
            break;
    }
}
function generateNewQuestion() {
    let choice = parseInt(prompt("Welche Art von Frage wollen Sie erstellen?\n1. ... eine Ja/Nein-Frage \n2. ...eine Schätzfrage \n3. ... eine Multiple Choice Frage \n4. ... eine Freitext-Frage\n (Wählen Sie 1,2,3 oder 4)"));
    let newQuestionText = "";
    switch (choice) {
        case 1:
            newQuestionText = prompt("Wie lautet die neue Ja/Nein Frage?");
            let newQuestionAnswerAsString = prompt("Ist die Antwort JA oder NEIN?");
            let newQuestionAnswerAsBoolean = false;
            if (newQuestionAnswerAsString != "YES" && newQuestionAnswerAsString != "NO")
                newQuestionAnswerAsString = "YES";
            newQuestionAnswerAsString == "YES" ? newQuestionAnswerAsBoolean = true : newQuestionAnswerAsBoolean = false;
            questions.push(new YesNoQuestion(newQuestionText, newQuestionAnswerAsBoolean));
            break;
        case 2:
            newQuestionText = prompt("Wie lautet die neue Schätzfrage?");
            let upperLimit = parseInt(prompt("Oberes Limit der Schätzung? "));
            let lowerLimit = parseInt(prompt("Unteres Limit der Schätzung? "));
            if (isNaN(upperLimit))
                upperLimit = 50;
            if (isNaN(lowerLimit))
                lowerLimit = 25;
            if (upperLimit < lowerLimit) {
                lowerLimit = [upperLimit, upperLimit = lowerLimit][0];
            }
            questions.push(new EstimateQuestion(newQuestionText, upperLimit, lowerLimit));
            break;
        case 3:
            newQuestionText = prompt("Wie lautet die neue Multiple Choice Frage?");
            let answerPossibilities = parseInt(prompt("Wie viele Antwortmöglichkeiten hat die Frage? (2 - 6)"));
            let newQuestion = new MultipleChoiceQuestion(newQuestionText, new Array(answerPossibilities));
            for (let i = 0; i < answerPossibilities; i++) {
                let newAnswerText = prompt("Wie lautet die " + (i + 1) + ". Antwort?\n Hinweis: Markieren sie die richtigen Antworten mit einem Leerzeichen und 'y' an letzter Stelle (Siehe Textfeld).", "Manuel ist Bombe y");
                if (newAnswerText.slice(-2) == " y") {
                    newAnswerText = newAnswerText.substring(0, newAnswerText.length - 2);
                    newQuestion.possibleAnswers[i] = new Answer(newAnswerText, true);
                }
                else
                    newQuestion.possibleAnswers[i] = new Answer(newAnswerText, false);
            }
            newQuestion.validateNewQuestion();
            questions.push(newQuestion);
            break;
        default:
            newQuestionText = prompt("Wie lautet die neue Freitext Frage?");
            let newAnswerText = prompt("Wie lautet die Antwort?");
            questions.push(new FreeTextQuestion(newQuestionText, newAnswerText));
            break;
    }
    getUserChoice();
}
function askQuestion() {
    let randomQuestionInd = Math.floor(Math.random() * questions.length);
    let randomQuestion = questions[randomQuestionInd];
    if (!JSON.stringify(questionsCache).includes(randomQuestion.questionText))
        questionsCache.push(randomQuestion);
    questions.splice(randomQuestionInd, 1);
    let userAnswer = prompt(randomQuestion.toString(), "Ihre Antwort:");
    if (randomQuestion.compareWithUserAnswer(userAnswer)) {
        correctAnswers++;
        console.log("Richtig");
    }
    else {
        console.log("Leider falsch");
    }
    getUserChoice();
}
//# sourceMappingURL=main.js.map