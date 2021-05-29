// Declare All Data

// Declare All Cards Infromation
let cardsBody = document.querySelector(".gameBody"),
      cards = [...cardsBody.children],
      cardsLength = cards.length;
// Declare All Stars Rate And Convet It To Array
const rateStars = document.querySelector(".rate"),
      star = [...rateStars.children];

// Declare Moves Counter
let moves = 0,
    counterElement = document.querySelector(".moves");

// Declare Timer Counter
let timer = 0,
    timerElement = document.querySelector(".timer");

// Get Matched Cards 
let matched = document.getElementsByClassName("match")

let duration = 1000

shuffle(cards)

cards.forEach((card,i) => {
  card.style.order = i;

  card.classList.add("open")
  setTimeout(()=>{
    card.classList.remove("open")
  },3000)
  card.addEventListener("click",function(){
    flipCards(this)
  })
})
// Shuffle Cards
// fisher yates shuffle algorithm
function shuffle(array){ // change cards position
  let current = array.length, random;
  while(current !== 0){
    current--
    random = Math.floor(Math.random() * cards.length);
    [array[current],array[random]] = [array[random],array[current]];
  }
  return array
}

// Flip Cards
function flipCards(card){
  card.classList.add("open");

  let isFliped = cards.filter(card => card.classList.contains("open"));
  if(isFliped.length === 2){
    stopClicking()
    checkMatched(isFliped[0],isFliped[1]);
    movesCounter()
    finishGame()
  }
}

// Stop Clicking Function

function stopClicking(){
  cardsBody.classList.add("no-clicking");

  setTimeout(()=>{
    cardsBody.classList.remove("no-clicking");
  },duration)
}

// Check Mathced Cards

function checkMatched(firstCard , secondCard){
  if(firstCard.getAttribute("type") === secondCard.getAttribute("type")){
    match(firstCard,secondCard)
  }
  else {
    unMatch(firstCard,secondCard)
  }
}

function match(cardOne,cardTwo) {
  cardOne.classList.remove("open");
  cardTwo.classList.remove("open");
  cardOne.classList.add("match");
  cardTwo.classList.add("match");
  document.querySelector("audio.success").play()
}

function unMatch(cardOne,cardTwo){
  cardOne.classList.add("wrong");
  cardTwo.classList.add("wrong");
  document.querySelector("audio.fail").play()
  setTimeout(()=>{
    cardOne.classList.remove("open","wrong")
    cardTwo.classList.remove("open","wrong")
  },duration)
}

// Moves Counter

function movesCounter(){
  moves++
  counterElement.innerHTML = `${moves} MOVE(S)`;
  if(moves == 1) {
    timerGame()
  }
  if(moves > 10 && moves < 15) {
    star[star.length - 1].style.display = "none";
  }
  else if(moves > 15){
    star[1].style.display = "none";
  }
}

// Timer Game
let second = 0, minute = 0,
    interval;
function timerGame(){
  interval = setInterval(()=>{
    second++
    timerElement.innerHTML = `${minute} Min , ${second} Sec`
    if(second == 60) {
      minute++
      second = 0;
    }
  },duration)
}

function finishGame(){
  if(matched.length == cards.length){
    let popup = document.querySelector(".popup-modal"),
        closePopup = document.getElementById("closeBtn"),
        finalMoves = document.getElementById("final-moves"),
        finalTime = document.getElementById("final-time"),
        finalRate = document.getElementById("final-rate");
    clearInterval(interval);
    finalMoves.innerHTML = moves;
    finalTime.innerHTML = timerElement.innerHTML;
    finalRate.innerHTML = rateStars.innerHTML
    popup.classList.add("show");
    document.querySelector("audio.winner").play();
    closePopup.addEventListener("click",()=>{
      popup.classList.remove("show");
    })
  }
}