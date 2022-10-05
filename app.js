const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#de5d5d', '#a65dde', '#46568f', '#468f7e', '#59a83d', '#c4b84b', '#c4944b']
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})
timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0) {
        finishGame();
    }else{
        let current = --time;
        if(current < 10) {
          current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class:"primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    let size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    let x = getRandomNumber(0, width - size);
    let y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.height = `${size}px`;
    circle.style.width = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
    setColor(circle)
}

function getRandomNumber(min, max) {
   return Math.trunc(Math.random() * (max - min) + min);
}

function setColor(el) {
    let color = getRandomColor();
    el.style.backgroundColor = color;
    el.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`;
}

function getRandomColor(color) {
    const idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
}