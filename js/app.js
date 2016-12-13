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


function playerHit(){
  if (deck.length > 0) {
    console.log(playerHand);
    var card = deck.shift();
    return playerHand.push(card);
  } else {
    console.log("out of cards.");
  }
}

/*function dealDealer(){
  if (deck.length > 0) {
    dealerHand.push(deck.shift());
    console.log(dealerHand);
  } else {
    console.log("out of cards.");
  }
}*/

function playerScoreTotal(){
  playerScore = 0;
  var aceCount = 0;
  playerHand.forEach(function(card) {
    aceCount += (card.val === 'Ace') ? 1 : 0;
  });
  for (var i = 0; i < playerHand.length; i++) {
    playerScore += getCardValue(playerHand[i]);
  }
  while (playerScore > 21 && aceCount) {
    playerScore -= 10;
    aceCount--;
  }
  return playerScore;
}

/*function dealerScoreTotal(){

  dealerScore = 0;
  for (var i = 0; i < dealerHand.length; i++) {
    dealerScore += dealerHand[i].val;
  }
  return dealerScore;
}*/

function isAbove(){
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






