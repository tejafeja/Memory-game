//A list that holds all cards
const cards = [
    "fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"
];

// A list of stars
let stars = [
    "fa fa-star",
    "fa fa-star",
    "fa fa-star"
];

//cards variables
const cardsDeck = document.querySelector('.deck'); 
let openedCards = []; //An array that holds one or two opened cards
let pairs = []; //an array that holds the matched pairs of cards
//moves variables
const movesCalculator = document.querySelector('.moves');
let moves = 0;
// timer variables
let timeContainer = document.querySelector('.time');
let time = 0;
let timePlayed;
let isTimerExecuted = false;
//select HTML reset button
const resetButton = document.querySelector(".restart");
//create a container for stars
let starsContainer = document.querySelector('.stars');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function init(){
    shuffle(cards);
    //cards appears on a screen
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        cardsDeck.appendChild(card);
 
        activateCard(card);  //function for clicking on the card
    }
    createStars();
}

//event listener for a card when clicked
function activateCard(card) {

    card.addEventListener('click', function () {
        startTimer(); //start counting game time
        //prevents from unnecessary clicking opened or matched card for calculating the steps
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            
            const newCard = this;       

            if (openedCards.length === 1) { 
                pushToOpenCardDeck(newCard);
                compareCards(openedCards[0], newCard);

            } else if (openedCards.length === 0) {
                pushToOpenCardDeck(newCard);
            }
        }
    });
 }

//add new opened card to opened card deck
function pushToOpenCardDeck(newCard) {
    newCard.classList.add('open', 'show');
    openedCards.push(newCard);
}

//compare two opened cards match
function compareCards(firstOpenedCard, newCard) {
    
    if (newCard.innerHTML === firstOpenedCard.innerHTML) {

        newCard.classList.add('match');
        firstOpenedCard.classList.add('match');

        //add into new section all matched pairs
        pairs.push(newCard, firstOpenedCard);
        openedCards = [];

        //check if the game is finished
        gameOver(); 

    } else {

        setTimeout(function () {
            //did not find matching pair, close cards
            newCard.classList.remove('open', 'show');
            firstOpenedCard.classList.remove('open', 'show');
            openedCards = [];
        }, 400);
    }
    movesCounter(); //two opened card is one move
    starsRating(); //checks star rating
}

// moves counter tracks the moves
function movesCounter() {
    moves++;
    movesCalculator.innerHTML = moves;
}

//using once to activate the timer clicking anywhere on the deck
function startTimer() {
    if (!isTimerExecuted) {
        isTimerExecuted = true;
        timePlayed = setInterval(function () {
            time += 1;
            timeContainer.textContent = timeConvert(time);
        }, 1000);
    };
}

//function to make hours, minutes and seconds
function timeConvert(time) {
    let hours = (time / 3600);
    let rhours = Math.floor(hours);
    let minutes = (time / 60);
    let rminutes = Math.floor(minutes);
    let seconds = (minutes - rminutes) * 60;
    let rseconds = Math.round(seconds);
    
    let sec = (rseconds < 10) ? "0" + rseconds : rseconds;
    let min = (rminutes < 10) ? "0" + rminutes : rminutes;
    let h = (rhours < 10) ? "0" + rhours : rhours;

    return h + ":" + min + ":" + sec;
}

//display stars
function createStars() {
    for (let j = 0; j < stars.length; j++) {
        let star = document.createElement('li');
        star.innerHTML = `<i class="${stars[j]}"></i>`;
        starsContainer.appendChild(star);
    };
}

// depending on moves display approprate stars rating
function starsRating () { 
    if (moves === 18 ) {
        starsContainer.removeChild(starsContainer.firstElementChild);
    } else if (moves === 25) {
        starsContainer.removeChild(starsContainer.firstElementChild);
    }
}

resetButton.addEventListener('click', function() {
    gameRestart();
});

//reset all game result 
function gameRestart() {
    
    //close all cards
    cardsDeck.innerHTML = "";
    init();
    pairs = [];
    openedCards = [];

    //reset all moves
    moves = 0;
    movesCalculator.innerHTML = moves;

    //reset timer
    time = 0;
    timeContainer.innerHTML = "00:00:00";
    clearInterval(timePlayed);
    isTimerExecuted = false;

    //reset stars
    starsContainer.innerHTML = "";
    createStars();
}

//check if all cards are opened and matched
function gameOver() {

    if (pairs.length === cards.length) {       
        setTimeout(function () {
            
            showWinnersInfo();
            const popupModal = document.querySelector('.modal');
            popupModal.style.display = "block"; //displays the popup

            clearInterval(timePlayed);
            const startAgainBtn = document.querySelector('.playBtn');          
            startAgainBtn.onclick = function () {
                popupModal.style.display = "none";
                gameRestart();
            };
        }, 200);
    }
}

//display winners information
function showWinnersInfo() {
    const paragraphText = document.querySelector('.winInfo');
    paragraphText.innerHTML = `With ${moves} Moves and ${starsContainer.getElementsByTagName('li').length} Stars in ${timeConvert(time)}.`;
}

//game started for the first time
init();
