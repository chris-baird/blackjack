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

$('#hit').on('click', hit.bind(null, 'p'));
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

function deal(playerHand,dealerHand) {
  for (i = 0; i < 2; i++) {}
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

function hit(who) {
  if (deck.length > 0) {
    var hand = (who === 'p') ? playerHand : dealerHand;
    var card = deck.shift();
    hand.push(card);
    console.log(hand);
  }
}

function scoreTotal(who) {
  playerScore = 0;
  dealerScore = 0;
  var hand = (who === playerHand) ? playerHand : dealerHand;
  var score = (who === playerHand) ? playerScore : dealerScore;
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

// function playerScoreTotal() {
//   playerScore = 0;
//   var aceCount = 0;
//   playerHand.forEach(function(card) {
//     aceCount += (card.val === 'Ace') ? 1 : 0;
//   });
//   for (var i = 0; i < playerHand.length; i++) {
//     playerScore += getCardValue(playerHand[i]);
//   }
//   while (playerScore > 21 && aceCount) {
//     playerScore -= 10;
//     aceCount--;
//   }
//   return playerScore;
// }


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






