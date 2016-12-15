/***Variables***/
var suits = ['s', 'h', 'c', 'd']

var vals = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

var deck = [];

var firstTurn = true;

var playerHand = [];

var dealerHand = [];

var playerScore = 0;

var dealerScore = 0;

var Card = function(suit, val) {
  this.suit = suit
  this.val = val
  this.stateValue = suit + val
}

/***Event Listeners***/
$('#hit-player').on('click', playerHit);

$('#play-game').on('click', init);

$('#stay').on('click', stand);

/***Functions***/
function init() {
  removeAllClassesP();
  removeAllClassesD();
  firstTurn = true;
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  $('#player-info').text('')
  $('.game-op').removeClass('remove-btns');
  makeDeck();
  shuffle(deck);
  // enableButtons();
  deal();
  isFirstTurn();
  checkBlackjack();
  render();
}

function makeDeck() {
  for(var i = 0; i < vals.length; i++){
    for(var j = 0; j < suits.length; j++){
      var card = new Card(suits[j], vals[i]);
      deck.push(card);
    }
  }
}

function checkBlackjack() {
  if (playerScore === 21) {
    $('#player-info').text('Blackjack! Player Wins.');
    hideButtons()
    // disableButtons();
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
/***Refactor Me!**/
function handleBustPlayer() {
  $('#player-info').text('Player has busted with ' + playerScore + ' Game over.');
  hideButtons()
  // disableButtons();
}
/***Refactor Me!**/
function handleBustDealer() {
  $('#player-info').text('Dealer has busted, You Win.');
  hideButtons()
  // disableButtons();
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
  } else if (playerScore === dealerScore) {
    $('#player-info').text('Tie');
  } else {
    $('#player-info').text('Dealer Wins with ' + dealerScore)
  }
  hideButtons()
}

function stand() {
  isAbove();
  isFirstTurn();
  // disableButtons();
  if (dealerScore > 21) {
    handleBustDealer();
  } else {
    checkWinner();
  }
}
/***Refactor Me!**/
// function disableButtons() {
//   $('#hit').off('click');
//   $('#stay').off('click');
// }
// **Refactor Me!*
// function enableButtons() {
//   $('#hit').on('click', playerHit);
//   $('#stay').on('click', stand);
// }
/***Refactor Me!**/
function renderPlayer() {
  for (var i = 0; i < playerHand.length; i++) {
    var str = "#pcard" + (i + 1);
    $(str).addClass(playerHand[i].stateValue);
  }
}
/***Refactor Me!**/
function renderDealer() {
  for (var i = 0; i < dealerHand.length; i++) {
    var str = "#dcard" + (i + 1);
    $(str).addClass(dealerHand[i].stateValue);
  }
}

function render() {
  if (playerScore < 21) {
    $('#player-info').text('Player has ' + playerScore + ' Hit or Stand?');
  }
  renderPlayer();
  renderDealer();
}
/***Refactor Me!**/
function removeAllClassesP() {
  for (var i = 0; i < 5; i++) {
    var str = "#pcard" + (i + 1);
    $(str).removeClass();
    $(str).addClass('card');
  }
}
/***Refactor Me!**/
function removeAllClassesD() {
  for (var i = 0; i < 5; i++) {
    var str = "#dcard" + (i + 1);
    $(str).removeClass();
    $(str).addClass('card');
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

function isFirstTurn() {
  if (firstTurn === true) {
    $('#dcard2').addClass('back');
    firstTurn = false;
  } else $('#dcard2').removeClass('back');
}

/***Initialize game***/
init();

function hideButtons() {
  $('.game-op').addClass('remove-btns');
}








