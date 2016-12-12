var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']

var vals = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

var deck = []

var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var DealerScore = 0;
var Card = function(suit, val) {
  this.suit = suit
  this.val = val
  this.stateValue = function(){
    return 'The ' + this.val + ' of ' + this.suit + '.'
  }
  this.faceVal = function() {
    if (isNaN(val)) {
      if (val === "King") {
        this.val = 10;
      } else if (val === "Queen") {
        this.val = 10;
      } else if (val === "Jack") {
        this.val = 10;
      } else if (val === "Ace") {
        if (playerScore < 11) {
          this.val = 11;
        } else {
          this.val = 1;
        }
      }
    }
  }
}

function init(){
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;

  for(var i = 0; i < vals.length; i++){
    for(var j = 0; j < suits.length; j++){
      var card = new Card(suits[j], vals[i])
      card.faceVal();
      deck.push(card)
    }
  }
  shuffle(deck);
}



function dealPlayer(){
  if (deck.length > 0) {
    playerHand.push(deck.shift());
    console.log(playerHand);
  } else {
    console.log("out of cards.");
  }
}

function dealDealer(){
  if (deck.length > 0) {
    dealerHand.push(deck.shift());
    console.log(dealerHand);
  } else {
    console.log("out of cards.");
  }
}

function playerScoreTotal(){

  playerScore = 0;
  for (var i = 0; i < playerHand.length; i++) {
    playerScore += playerHand[i].val;
  }
  return playerScore;
}

function dealerScoreTotal(){

  dealerScore = 0;
  for (var i = 0; i < dealerHand.length; i++) {
    dealerScore += dealerHand[i].val;
  }
  return dealerScore;
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






