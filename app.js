let board; //array to save each square value
let turn = 'X';
let win;
let counter; // for Tie 
let xWin = 0;
let oWin = 0;
let tie = 0;
var mySound;
let player = 'two';

//return some elements form HTML
const squares = Array.from(document.querySelectorAll('.square')); //get array of all divs
const messages = document.querySelector('h2');
const whoWin = document.querySelector('p');
const scorex = document.querySelector('#countx');
const scoreo = document.querySelector('#counto');
const scoretie = document.querySelector('#countTie');
const hideDiv = document.querySelector('#hide');
const chooseX = document.querySelector('#chooseP1');
const chooseO = document.querySelector('#chooseP2');


//create events 
document.getElementById('playAgine').addEventListener('click', start);
document.getElementById('chooseP1').addEventListener('click', xTurn);
document.getElementById('chooseP2').addEventListener('click', oTurn);
document.getElementById('favcolor').addEventListener("change", watchColorPicker, false);

//the inislize function
function start() {

    //create event for each square
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', clickEvent);
    }
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    counter = 0;
    messages.innerText = `It's ${turn}'s turn!`;
    scorex.innerText = `X: ${xWin} times `;
    scoreo.innerText = ` O: ${oWin} times`;
    scoretie.innerText = `Tie: ${tie} times`;
    whoWin.innerText = ``;

    cell();
};
start();

function cell() {
    //forEach() is a method that call the function once for each element in an array in order.
    board.forEach(function (x_o, index) {
        squares[index].innerHTML = "<h1>" + x_o + "</h1>";

    });

};

function clickEvent() {
    //idx is to find which square was pressed
    let idx = squares.findIndex(function (square) {
        return square === event.target;
    });

    //to play sound
    mySound = new Audio('click.mp3');
    mySound.play();

    counter++;
    board[idx] = turn;
    squares[idx].removeEventListener("click", clickEvent);
    win = getWinner();
    cell();

    //To check which players turn
    if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    };
    messages.innerText = `It's ${turn}'s turn!`;
};


function getWinner() {
    let winner = 'null';

    // all 8 cases for win
    if ((board[0] === board[1] && board[2] === board[0] && board[0] === 'X') ||
        (board[3] === board[4] && board[5] === board[3] && board[3] === 'X') ||
        (board[6] === board[7] && board[8] === board[6] && board[6] === 'X') ||
        (board[0] === board[3] && board[6] === board[0] && board[0] === 'X') ||
        (board[1] === board[4] && board[7] === board[1] && board[1] === 'X') ||
        (board[2] === board[5] && board[8] === board[2] && board[2] === 'X') ||
        (board[0] === board[4] && board[8] === board[0] && board[0] === 'X') ||
        (board[2] === board[4] && board[6] === board[2] && board[2] === 'X')
    ) {
        winner = 'X';
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', clickEvent);
        }
        xWin++;
        whoWin.innerText = `The winner is ${winner}`;


    } else if ((board[0] === board[1] && board[2] === board[0] && board[0] === 'O') ||
        (board[3] === board[4] && board[5] === board[3] && board[3] === 'O') ||
        (board[6] === board[7] && board[8] === board[6] && board[6] === 'O') ||
        (board[0] === board[3] && board[6] === board[0] && board[0] === 'O') ||
        (board[1] === board[4] && board[7] === board[1] && board[1] === 'O') ||
        (board[2] === board[5] && board[8] === board[2] && board[2] === 'O') ||
        (board[0] === board[4] && board[8] === board[0] && board[0] === 'O') ||
        (board[2] === board[4] && board[6] === board[2] && board[2] === 'O')
    ) {
        winner = 'O';
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', clickEvent);
        }
        oWin++;
        whoWin.innerText = `The winner is ${winner}`;


    } else if (counter === 9) {
        winner = 'Tie';
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', clickEvent);
        }
        tie++;
        whoWin.innerText = `No one win!!`;

    }


    console.log("The winner is: " + winner);

    return winner;
};




function xTurn() {
    turn = 'X';
    start();
};


function oTurn() {
    turn = 'O';
    start();
};



// to change the background color by the user
function watchColorPicker(event) {
    document.querySelectorAll("body").forEach(function (p) {
        p.style.background = event.target.value;
    });
};