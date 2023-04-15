'use strict'

const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const rock = document.querySelector('.rock');
const triangle = document.querySelector('.hero__triangle');
const result = document.querySelector('.result')
const resultHeader = document.querySelector('.result__header')
const housePickShadow = document.querySelector('.hero__house-pick__shadow')
const housePick = document.querySelector('.hero__house-pick')
const housePickedOption = document.querySelector('.hero__house-picked-option')
const userPickHeader = document.querySelector('.hero__user-pick__header')
const housePickHeader = document.querySelector('.hero__house-pick__header')
const userGlow = document.querySelector('.hero__user-pick__glow')
const houseGlow = document.querySelector('.hero__house-pick__glow')
const scoreValue = document.querySelector('.score__value')
const btnPlayAgain = document.querySelector('.result__play-again')
const rules = document.querySelector('.rules')
const btnOpenRules = document.querySelector('.rules__button')
const btnCloseRules = document.querySelector('.rules__close-btn')

const choices = ['rock', 'paper', 'scissors'];
var score = 0;

const getHouseChoice = function () {
    let houseRandomPick = '';
    let randomNumber = Math.floor(Math.random() * 3 + 1);
    if (randomNumber === 1) houseRandomPick = 'paper';
    if (randomNumber === 2) houseRandomPick = 'rock';
    if (randomNumber === 3) houseRandomPick = 'scissors';
    return houseRandomPick;
}


const whoWon = function (userChoice, houseChoice) {
    let user = choices.indexOf(userChoice);
    let house = choices.indexOf(houseChoice);

    if (user === house) return 'draw'
    if (user == choices.length - 1 && house == 0) return 'lose'
    if (house == choices.length - 1 && user == 0) return 'win'
    if (user > house) return 'win'
    if (house > user) return 'lose'

}

const whoWonDisplay = function (winOrNot) {
    if (winOrNot === 'draw') {
        resultHeader.innerHTML = "DRAW";
    } else {
        resultHeader.innerHTML = winOrNot === "win" ? 'YOU WIN' : 'YOU LOSE'
        let glow = winOrNot === "win" ? userGlow : houseGlow
        return glow
    }
}

const addScore = function (whoWonResult) {
    if (whoWonResult === 'win') score++;
}

const renderHousePick = function () {
    setDisplayStyle([housePickShadow], 'none');
    setDisplayStyle([housePickedOption], 'flex');
}

const renderResult = function (winnerGlow, whoWonResult) {
    setDisplayStyle([result], 'flex');
    if (typeof winnerGlow !== 'undefined') setDisplayStyle([winnerGlow], 'block');
    scoreValue.innerHTML = score;
    if (whoWonResult === 'win') { btnPlayAgain.style.color = 'var(--play-again--win)' }
    if (whoWonResult === 'lose') { btnPlayAgain.style.color = 'var(--play-again--lose)' }
    if (whoWonResult === 'draw') { btnPlayAgain.style.color = 'var(--play-again--draw)' }
}

const setDisplayStyle = function (arr, display) {
    arr.forEach(el => el.style.display = display);
}

const displayBattle = function (clickedByUser) {
    if (clickedByUser.classList.contains('picked')) return;
    let userChoice = clickedByUser.dataset.option;
    let houseChoice = getHouseChoice()
    let whoWonResult = whoWon(userChoice, houseChoice)
    let winnerGlow = whoWonDisplay(whoWonResult)

    addScore(whoWonResult)

    clickedByUser.classList.add('picked');
    housePickedOption.classList.add(houseChoice);

    setDisplayStyle([rock, scissors, paper, triangle], 'none');
    setDisplayStyle([userPickHeader, housePickHeader, housePickShadow, clickedByUser, housePick], 'flex');

    setTimeout(renderHousePick, 500);
    setTimeout(renderResult, 700, winnerGlow, whoWonResult);
}

paper.addEventListener('click', function () { displayBattle(paper) });
rock.addEventListener('click', function () { displayBattle(rock) });
scissors.addEventListener('click', function () { displayBattle(scissors) });

const playAgain = function () {
    setDisplayStyle([userPickHeader, housePickHeader, housePickShadow, housePickedOption, result, userGlow, houseGlow, housePick], 'none');
    setDisplayStyle([rock, scissors, paper, triangle], 'flex');

    [paper, rock, scissors].forEach(el => el.classList.remove('picked'))
    housePickedOption.classList.remove("rock", "paper", "scissors");
}

btnPlayAgain.addEventListener('click', playAgain);

btnOpenRules.addEventListener('click', setDisplayStyle([rules], 'block'));
btnCloseRules.addEventListener('click', setDisplayStyle([rules], 'none'));