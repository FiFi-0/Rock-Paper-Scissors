'use strict'

const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const rock = document.querySelector('.rock');
const triangle = document.querySelector('.hero__triangle');
const result = document.querySelector('.result')
const housePickShadow = document.querySelector('.hero__house-pick__shadow')
const housePick = document.querySelector('.hero__house-pick')
const housePickedOption = document.querySelector('.hero__house-picked-option')
const userPickHeader = document.querySelector('.hero__user-pick__header')
const housePickHeader = document.querySelector('.hero__house-pick__header')
const userGlow = document.querySelectorAll('.hero__user-pick__glow')
const houseGlow = document.querySelector('.hero__house-pick__glow')

const setDisplayStyle = function (arr, display) {
    arr.forEach(el => el.style.display = display);
}

const displayBattle = function (clickedByUser) {
    clickedByUser.classList.add('picked');
    housePickedOption.classList.add('rock');
    setDisplayStyle([rock, scissors, paper, triangle], 'none');
    setDisplayStyle([userPickHeader, housePickHeader, housePickShadow, clickedByUser], 'flex');
    setTimeout(function () {
        setDisplayStyle([housePickShadow], 'none');
        setDisplayStyle([housePickedOption], 'flex');
    }, 700);

    setTimeout(function () {
        setDisplayStyle([result], 'flex');
        setDisplayStyle([...userGlow], 'block');

    }, 1200);
}
paper.addEventListener('click', function () { displayBattle(paper) });
rock.addEventListener('click', function () { displayBattle(rock) });
scissors.addEventListener('click', function () { displayBattle(scissors) });
