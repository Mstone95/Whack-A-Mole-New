//declare image paths
const holePath = "images/hole.png"
const molePath = "images/mole.png"

let score = 0
const scoreToWin = 35
let time = 30
let intervalId = null

let gameHasStarted = false


//generate location of mole
function getRandomHole() {
    return Math.floor(Math.random() * 9); //generate rand integer 0-8
}

function removeMole() { //reset the holes
    const holes = document.querySelectorAll(".mole-or-no")

    //iterate through each hole and reset  
    for (i = 0; i < holes.length; i++) {
        holes[i].setAttribute("src", holePath)
    }
}

function placeMole() {
    removeMole()
    //make index of array of holes = the randomly generated Integer
    const moleIndex = getRandomHole()
    //place mole image in selected index
    const holes = document.querySelectorAll(".mole-or-no")
    holes[moleIndex].setAttribute("src", molePath)
}

function resetGame() {
    placeMole()
    gameHasStarted = true
    document.querySelector(".game-status").innerHTML = "Get " + scoreToWin + " to win!"
    if (intervalId) { //make sure there is only one timer
        clearInterval(intervalId)
    }
    //set interval to 1 sec, get its ID, start count down, and reset score
    intervalId = setInterval(countDown, 1000)
    time = 30
    score = 0
    document.querySelector(".score").innerHTML = score
}

//user click on an image moves mole
function handleImageClick(clickEvent) {
    if (!gameHasStarted) { return }

    if (clickEvent.target.src.includes(molePath)) {
        //if its a mole increase score, and play sound
        score++
        document.querySelector(".score").innerHTML = score
       const soundEffect = new Audio("sounds/CHORD.WAV")
       soundEffect.play()
    }
    else{ // if not, play other sound
        const soundEffect = new Audio("sounds/DING.WAV")
        soundEffect.play()
    }
    placeMole()
}

//decrement the time
function countDown() {
    if (time === 0) {
        //when time = 0, end game
        gameHasStarted = false
        clearInterval(intervalId)
        endGame()
    }
    //update the DOM and time every 1 second
    document.querySelector(".time").innerHTML = time
    time--
}

function endGame() {
    //if score is greater than score needed, tell user they won, and play sound
    if (score >= scoreToWin) {
        document.querySelector(".game-status").innerHTML = "You Won!"
        const soundEffect = new Audio("sounds/TADA.WAV")
        soundEffect.play()
    }
    //if score is less than needed, tell user they lost, and play sound
   else{ 
   document.querySelector(".game-status").innerHTML = "You Lost! Wah Wah"
   const soundEffect = new Audio("sounds/musicaerr.mp3")
   soundEffect.play()
}
removeMole()
}

//When start button is clicked, reset game
const startButton = document.querySelector(".start")
startButton.addEventListener("click", resetGame)

//iterate through each hole and make it clickable
const holes = document.querySelectorAll(".mole-or-no")

for (i = 0; i < holes.length; i++) {
    holes[i].addEventListener("click", handleImageClick)
    //click event is passed as an argument into handleImageClick
}