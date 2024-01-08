const keyboardDiv= document.querySelector(".keyboard");
const hangmanImage= document.querySelector(".hangman-box img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const gameModal= document.querySelector(".game-modal");
const PlayAgainBtn=document.querySelector(".play-again");
let currentWord,correctLetters,wrongGuessCount;
let maxGuess=6;
const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = ()=>{
    const { word, hint } = WordList[Math.floor(Math.random() * WordList.length)];
    console.log(word);
    currentWord=word;
    const hints= document.querySelector(" .hint-text b");
    hints.innerText= hint;
resetGame();}
const GameOver=(isVictory)=>{
setTimeout(()=>{

    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
},300)
}
const initGame= (button,clickedLetter)=>{
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else{wrongGuessCount++;
hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
   
    }
    button.disabled=true;
    guessesText.innerText=`${wrongGuessCount}/${maxGuess}`;
    
    if(wrongGuessCount===maxGuess)
        return GameOver(false);
        if(correctLetters.length===currentWord.length)
        return GameOver(true);
}


//creating keyboard buttons
for(let i=97; i<=122; i++)
{
    const button= document.createElement("button");
  console.log( button.innerText=String.fromCharCode(i));
   keyboardDiv.appendChild(button);
   button.addEventListener("click",(e)=>initGame(e.target,String.fromCharCode(i)))
}
getRandomWord();
PlayAgainBtn.addEventListener("click",getRandomWord);