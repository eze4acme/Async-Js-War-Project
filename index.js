
let deckId;
// getCard()
const cardRemaining = document.getElementById('deck-remaining')
const cardButtonEl = document.getElementById("new-deck")
const displayWinnerEl = document.getElementById('display-winner')
const remainingEl = document.getElementById('remaining')
function getCard() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => { data; deckId = data.deck_id; 
        // console.log(data);
        remainingEl.innerHTML = `Remaining cards: ${data.remaining}`
    
    })
}
cardButtonEl.addEventListener('click', getCard)

function drawCard() {
    // getCard()
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json()).then(data => {data
       
        // console.log(data.cards[0]);
    document.getElementById('display-image').children[0].innerHTML = `
    <img src=${data.cards[0].image} class="card">
    `
    document.getElementById('display-image').children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card">
    `
   const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    displayWinnerEl.textContent = winnerText;
    remainingEl.innerHTML = `Remaining cards: ${data.remaining}`
    if (data.remaining == 0) {
       const disableBtn = document.getElementById('draw-card')
       disableBtn.disabled = true
       disableBtn.classList.add('disable');
       displayWinnerEl.classList.add('font-type')
       if(computerScorePt > PlayerScorePt){
        displayWinnerEl.textContent = 'Hey Dude Computer Won!!!!'
        setTimeout(() => {
            reload()
        }, 3000);
       }else if(computerScorePt < PlayerScorePt) {
        displayWinnerEl.textContent = 'Congrats You Won!!!!'
        setTimeout(() => {
            reload()
        }, 3000);
       }else{
        displayWinnerEl.textContent = 'What a Draw!!!!'
        setTimeout(() => {
            reload()
        }, 3000);
       }
    }
    
})
}

document.getElementById('draw-card').addEventListener('click', drawCard)
let computerScorePt = 0;
let PlayerScorePt = 0;
const computerScore = document.getElementById('computer-score')
const myScore = document.getElementById('my-score')
function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
     "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex ) {
        computerScorePt += 5
        computerScore.textContent = `Computer score: ${computerScorePt}`
        return 'Computer wins!'
    }else if (card2ValueIndex > card1ValueIndex) {
        PlayerScorePt += 5
        myScore.textContent = `My score: ${PlayerScorePt}`
        return 'You win!'
    }
    else {
        return "War!";
    }
}

function reload() {
  location.reload()
}
   



