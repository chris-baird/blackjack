var suits = ['s', 'h', 'c', 'd']

var vals = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

var deck = [];

var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var dealerScore = 0;
var Card = function(suit, val) {
  this.suit = suit
  this.val = val
  this.stateValue = suit + val
}

$('#hit-player').on('click', playerHit);
$('#play-game').on('click', init);
$('#stay').on('click', stand);

function init() {
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
  $('#player-info').text('')
  shuffle(deck);
  enableButtons();
  deal();
  checkBlackjack();
  render();
}


function checkBlackjack() {
  if (playerScore === 21) {
    $('#player-info').text('Blackjack! Player Wins.');
    disableButtons();
  }
}

function deal() {
  for (i = 0; i < 2; i++) {
    playerHit();
    dealerHit();
  }
}

function getCardValue(card) {
  if (card.val === "K") {
    return 10;
  } else if (card.val === "Q") {
    return 10;
  } else if (card.val === "J") {
    return 10;
  } else if (card.val === "A") {
    return 11;
  } else {
    return card.val;
  }
}

function hit(hand) {
  if (deck.length > 0) {
    var card = deck.shift();
    hand.push(card);
    return scoreTotal(hand);
  }
}

function playerHit() {
  playerScore = hit(playerHand);
  if (playerScore > 21) {
    handleBustPlayer();
  }
  checkBlackjack();
  render();
}

function dealerHit() {
  dealerScore = hit(dealerHand);
  if (dealerScore > 21) {
    handleBustDealer();
  }
  checkBlackjack();
  render();
}

function handleBustPlayer() {
  $('#player-info').text('Player has busted, Game over.');
  disableButtons();
}

function handleBustDealer() {
  $('#player-info').text('Dealer has busted, You Win.');
  disableButtons();
}

function scoreTotal(hand) {
  var score = 0;
  var aceCount = 0;
  hand.forEach(function(card) {
    aceCount += (card.val === 'A') ? 1 : 0;
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

function isAbove() {
  while (dealerScore < 17) {
    dealerHit();
  }
}

function checkWinner() {
  if (playerScore > dealerScore) {
    $('#player-info').text('Player Wins with ' + playerScore);
    disableButtons();
  } else if (playerScore === dealerScore) {
    $('#player-info').text('Tie');
    disableButtons();
  } else {
    $('#player-info').text('Dealer Wins with ' + dealerScore)
    disableButtons();
  }
}

function stand() {
  isAbove();
  disableButtons();
  if (dealerScore > 21) {
    handleBustDealer();
  } else {
    checkWinner();
  }
}

function disableButtons() {
  $('#hit').off('click');
  $('#stay').off('click');
}

function enableButtons() {
  $('#hit').on('click', playerHit);
  $('#stay').on('click', stand);
}

function render() {
  if (playerScore < 21) {
    $('#player-info').text('Player has ' + playerScore + ' Hit or stand?');
  }
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






