/****Variables****/
var suits = ['s', 'h', 'c', 'd']

var vals = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

var deck = [];

var firstTurn = true;

var playerHand = [];

var dealerHand = [];

var playerScore = 0;

var dealerScore = 0;

var playerBank = 200;

var betAmount;

var bets = $('.bet-btn');

var Card = function(suit, val) {
  this.suit = suit
  this.val = val
  this.stateValue = suit + val
}

/***Event Listener***/
$('#player-funds').text('funds ' + playerBank);

$('#hit-player').on('click', playerHit);

$('#play-game').on('click', playGame);

$('#stay').on('click', stand);

/***Functions***/
function init() {
  $('#play-game').addClass('remove-btns');
  removeAllClasses('#pcard');
  removeAllClasses('#dcard');
  clearValues();
  makeDeck();
  shuffle(deck);
  deal();
  isFirstTurn();
  checkBlackjack();
  render();
}

function playGame() {
  init();
  takeBet();
  $('#player-funds').text('funds ' + playerBank);
}

function takeBet() {
  for (var i = 0; i < bets.length; i++) {
    var elem = bets[i];
    if ($(elem).is(':checked')) {
      betAmount = parseInt(elem.value);
    }
  }
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
    $('#play-game').removeClass('remove-btns');
    hideButtons();
    handleBet(betAmount, true);
  }
}

function handleBust(who) {
  $('#player-info').text(who + ' has busted Game Over');
  $('#play-game').removeClass('remove-btns');
  hideButtons();
}

function handleBet(amt, win) {
  var amount = amt + amt;

  if (win) {
    return playerBank = playerBank + amount;
  } else {
    return playerBank = playerBank - amt;
  }
}

function checkWinner() {
  if (playerScore === 21) {
    handleBet(betAmount, true);
    $('#player-info').text('Blackjack! Player Wins.');
    $('#play-game').removeClass('remove-btns');
    hideButtons();
  } else if (playerScore > dealerScore) {
    $('#player-info').text('Player Wins with ' + playerScore);
    $('#play-game').removeClass('remove-btns');
    handleBet(betAmount, true);
  } else if (playerScore === dealerScore) {
    $('#player-info').text('Push');
    $('#play-game').removeClass('remove-btns');
  } else {
    $('#player-info').text('Dealer Wins with ' + dealerScore)
    $('#play-game').removeClass('remove-btns');
    handleBet(betAmount, false);
  }
  hideButtons();
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
    handleBust('Player');
    handleBet(betAmount, false);
  }

  if (playerScore === 21) {
    handleBet(betAmount, true);
    $('#player-info').text('Blackjack! Player Wins.');
    $('#play-game').removeClass('remove-btns');
    hideButtons();
  }
  render();
}

function dealerHit() {
  dealerScore = hit(dealerHand);
  if (dealerScore > 21) {
    handleBust('Dealer');
  }
  render();
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

function stand() {
  isAbove();
  isFirstTurn();
  if (dealerScore > 21) {
    handleBust('Dealer');
    handleBet(betAmount, true);
  } else {
    checkWinner();
  }
}

function renderPlayer(renderWho, hand) {
  for (var i = 0; i < hand.length; i++) {
    var str = renderWho + (i + 1);
    $(str).addClass(hand[i].stateValue);
  }
}

function render() {
  if (playerScore < 21) {
    $('#player-info').text('Player has ' + playerScore + ' Hit or Stay?');
  }
  renderPlayer('#pcard', playerHand);
  renderPlayer('#dcard', dealerHand);
}

function removeAllClasses(role) {
  for (var i = 0; i < 6; i++) {
    var str = role + (i + 1);
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

function hideButtons() {
  $('.game-op').addClass('remove-btns');
}

function clearValues() {
  firstTurn = true;
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  $('#player-info').text('')
  $('.game-op').removeClass('remove-btns');
}
