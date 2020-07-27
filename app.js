document.addEventListener('DOMContentLoaded', () => {
//card options
const imgData = [
    {
        name: 'Batman',
        img: 'Images/Batman.png'
    },
    {
        name: 'Diamondsword',
        img: 'Images/Diamondsword.png'
    },
    {
        name: 'Gandolf',
        img: 'Images/Gandolf.png'
    },
    {
        name: 'Harrypotter',
        img: 'Images/Harrypotter.png'
    },
    {
        name: 'Hulk',
        img: 'Images/Hulk.png'
    },
    {
        name: 'Ironman',
        img: 'Images/Ironman.png'
    },
    {
        name: 'Kirby',
        img: 'Images/Kirby.png'
    },
    {
        name: 'Link',
        img: 'Images/Link.png'
    },
    {
        name: 'Mario',
        img: 'Images/Mario.png'
    },
    {
        name: 'Minion',
        img: 'Images/Minion.png'
    },
    {
        name: 'R2d2',
        img: 'Images/R2d2.png'
    },
    {
        name: 'Scoobysnacks',
        img: 'Images/Scoobysnacks.png'
    },
    {
        name: 'Sonic',
        img: 'Images/Sonic.png'
    },
    {
        name: 'Stormtrooper',
        img: 'Images/Stormtrooper.png'
    },
    {
        name: 'Superman',
        img: 'Images/Superman.png'
    },
    {
        name: 'Thor',
        img: 'Images/Thor.png'
    },
    {
        name: 'Toad',
        img: 'Images/Toad.png'
    },
    {
        name: 'Yoshi',
        img: 'Images/Yoshi.png'
    }
    ];

// Initial size of the board
let size = 8;

// Grid variable
const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const winnerDisplay = document.querySelector('#youwon');
// Card Array Variable
let cardArray = [];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

let canFlip = true;
let score = 0;

// Function that sets the size variable based on the level selected
function setLevel(){
    const levels = document.querySelectorAll('.levelSelect > div');
    levels.forEach((level) => {
        level.addEventListener('click', ()=> {
            if(level.classList.contains('size2x2')){
                size = 2;
            }
            else if(level.classList.contains('size2x4')){
                size = 4;
            }
            else if(level.classList.contains('size4x4')){
                size = 8;
            }
            else if(level.classList.contains('size4x6')){
                size = 12;
                grid.classList.add("l");
            }
            else{
                size = 18;
                grid.classList.add("l");
            }
            if(!(size === 12 || size === 18)){
                grid.classList.remove("l");                
            }
            clearBoard();
            createBoard(size);
        });
    });
}

function adjustSize(size){
    let images = document.getElementsByTagName("img");
    for(let i = 0; i < images.length; i++){
        if(size === 2){
        images[i].classList.add("img2x2");
        }
        else if(size === 4){
        images[i].classList.add("img2x4");
        }
        else if (size === 18){
        images[i].classList.add("img6x6")
        }
    }
}

//creates your board
function createBoard(size){
    cardArray = createArray(imgData, size);
    reset();
    for(let i = 0; i < cardArray.length; i++){
        var card = document.createElement('img');
        card.setAttribute('src', 'Images/Questionmark.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
    adjustSize(size);
}

function reset(){
    resultDisplay.textContent = "";
    score = 0;
    cardsWon = [];
    winnerDisplay.textContent = "";
}
    
function createArray(arr, n){
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    arrDuplicate(result);
    shuffle(result);
    return result;
}

function arrDuplicate(arr){
    initial_size = arr.length;
    for(let i = 0; i < initial_size; i++){
        arr.push(arr[i]);
    }
    return arr;
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function clearBoard(){
    grid.innerHTML = '';
}

function checkForMatch() {
    canFlip = false;
    let cards = document.querySelectorAll('img');
    if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] != cardsChosenId[1]){
        cardsWon.push(cardsChosen);
        cards[cardsChosenId[0]].removeEventListener("click", flipCard); 
        cards[cardsChosenId[1]].removeEventListener("click", flipCard);
        score+=3;
    }
    else{
        cards[cardsChosenId[0]].setAttribute('src', 'Images/Questionmark.png')
        cards[cardsChosenId[1]].setAttribute('src', 'Images/Questionmark.png')
        score-=1;
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = score;
    console.log(cardsWon);
    if(cardsWon.length === cardArray.length/2){
        winnerDisplay.textContent = " Congratulations! You found them all!"
    }
}

function flipCard(){
    let cardId = this.getAttribute('data-id');
    if(cardsChosenId[0] != cardId){
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
        }
    if (cardsChosen.length === 2){
        setTimeout(checkForMatch, 500);
    }
    else if(cardsChosen.length > 2){
        this.setAttribute('src', 'Images/Questionmark.png')
    }
}

createBoard(size);
setLevel();
});