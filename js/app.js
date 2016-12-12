/*var deck = ["1Ac","2c","3c","4c","5c","6c","7c","8c","9c","10c","10Jc","10Qc","10Kc",
            "1Ad","2d","3d","4d","5d","6d","7d","8d","9d","10d","10Jd","10Qd","10Kd",
            "1As","2s","3s","4s","5s","6s","7s","8s","9s","10s","10Js","10Qs","10Ks",
            "1Ah","2h","3h","4h","5h","6h","7h","8h","9h","10h","10Jh","10Qh","10Kh",];

var playerHand = [];

var dealerHand = [];

var playerScore = 0;

var dealerScore = 0;

function init(){
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
}

function score(){
  playerScore = playerScore + parseInt(playerHand);
}

function shuffle(array){
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
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
  } else {
    console.log("out of cards.");
  }
}*/

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

function score(){

  playerScore = 0;
  for (var i = 0; i < playerHand.length; i++) {
    playerScore += playerHand[i].val;
  }
  return playerScore;
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






