var deck = ["Ac","2c","3c","4c","5c","6c","7c","8c","9c","10c","Jc","Qc","Kc",
            "Ad","2d","3d","4d","5d","6d","7d","8d","9d","10d","Jd","Qd","Kd",
            "As","2s","3s","4s","5s","6s","7s","8s","9s","10s","Js","Qs","Ks",
            "Ah","2h","3h","4h","5h","6h","7h","8h","9h","10h","Jh","Qh","Kh",];
var playerHand = [];
var dealerHand = [];

var playerScore;
var dealerScore;

function shuffle(array) {
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
}



