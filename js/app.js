var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']

var vals = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

var deck = [];

var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var dealerScore = 0;
var Card = function(suit, val) {
  this.suit = suit
  this.val = val
  this.stateValue = function(){
    return 'The ' + this.val + ' of ' + this.suit + '.'
  }
}

$('#hit').on('click', playerHit);
$('#play-game').on('click', init);

function init(){
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;

  for(var i = 0; i < vals.length; i++){
    for(var j = 0; j < suits.length; j++){
      var card = new Card(suits[j], vals[i]);
      deck.push(card);
    }
  }
  shuffle(deck);
  deal();
  checkBlackjack();
  render();
}

function checkBlackjack() {
  if (playerScore === 21) {
    console.log('Player Blackjack!');
  } else if (dealerScore === 21) {
    console.log('Dealer Balckjack!');
  }
}

function deal() {
  for (i = 0; i < 2; i++) {
    playerHit();
    dealerHit();
  }
}


function getCardValue(card) {
  if (card.val === "King") {
    return 10;
  } else if (card.val === "Queen") {
    return 10;
  } else if (card.val === "Jack") {
    return 10;
  } else if (card.val === "Ace") {
    return 11;
  } else {
    return card.val;
  }
}

function playerHit() {
  playerScore = hit(playerHand);
  if (playerScore > 21) handleBust('p');
  render();
}

function dealerHit() {
  dealerScore = hit(dealerHand);
  if (dealerScore > 21) handleBust('d');
  render();
}

function handleBust(who) {

}

// returns updated score for hand
function hit(hand) {
  if (deck.length > 0) {
    var card = deck.shift();
    hand.push(card);
    return scoreTotal(hand);
  }
}

function scoreTotal(hand) {
  var score = 0;
  var aceCount = 0;
  hand.forEach(function(card) {
    aceCount += (card.val === 'Ace') ? 1 : 0;
  });
  for (var i = 0; i < hand.length; i++) {
    score += getCardValue(hand[i]);
  }
  while (score > 21 && aceCount) {
    score -= 10;
    aceCount--;
  }
  return score;
}

function render() {
  console.log('The board has been updated')
}

function isAbove() {
  if(dealerScore < 17){
    dealDealer();
  } else return;
}

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

init();






