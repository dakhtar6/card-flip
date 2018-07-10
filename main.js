
(() => {
'use strict';
  
  ///////////
  //GLOBALS//
  //////////

  //contains our deck of cards
  let cards = [];
  //is where our cards are inserted into the DOM 
  let listItem = document.getElementById('dealt-cards'); 

  ////////////
  //METHODS//
  //////////

  //creates a suit of 13 cards and appends to the cards array
  const createSuit = (cards, suit) => {
    let value = 2;
    let generated = []; 
    for(let i = 0; i < 13; i++) {
      if(value <= 10) {
        generated[i] = value + suit; 
        value++; 
      }
      else if(value === 11) {
        generated[i] = "J" + suit; 
        value++; 
      }
      else if(value === 12) {
        generated[i] = "Q" + suit; 
        value++; 
      }
      else if(value === 13) {
        generated[i] = "K" + suit; 
        value++; 
      }
      else if(value === 14) {
        generated[i] = "A" + suit; 
        value++; 
      }
    }
    Array.prototype.push.apply(cards, generated);
    return cards
  }

  //randomize card order
  const shuffle = (cards) => {
    let currentIndex = cards.length;
    let temporaryValue; 
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    return cards;
  }
  
  //render cards into DOM
  const renderCards = (cards) => {
    //create a container div to hold our cards
    let cardContainer = document.createElement('div'); 
    cardContainer.id = "card-container"; 
    cardContainer.className = "flex"; 
    //loop through and append each card as a child of the cardContainer div
    cards.forEach((card) => {
      cardContainer.appendChild(card); 
    }); 
    //append cardContainer to the DOM as a child of the list item
    listItem.appendChild(cardContainer); 
  }

  //remove cards that were already dealt from the cards array
  const removeDealtCards = (cards) => {
    cards.splice(0, 4);
    console.log("removed", cards);  
  }

  //generate cards from 
  const generateCards = (cards) => {
    let generated = []; 
    // loop through and make 4 cards 
    for (let i = 0; i < 4; i++) {
      //create card and corresponding html elements
      let listItem = document.createElement('li'); 
      listItem.id = "dealt-cards"; 
      let card = document.createElement('div'); 
      card.className = "card"; 
      let centerLogo = document.createElement('div'); 
      centerLogo.className = "center-logo"; 
      let topLogo = document.createElement('div'); 
      topLogo.className = "top-logo"; 
      let bottomLogo = document.createElement('div'); 
      bottomLogo.className = "bottom-logo";
 
      //set card's innerhtml to match the card's numeric value and add correct card suit unicode character
      if(cards[i][cards[i].length-1] === "H") {
        topLogo.innerHTML = cards[i].substring(0, cards[i].length-1) + '<br>\u2665';
        bottomLogo.innerHTML = '\u2665<br>' + cards[i].substring(0, cards[i].length-1); 
        centerLogo.innerHTML = '\u2665'; 
        card.classList.add('hearts');  
      }
      else if(cards[i][cards[i].length-1] === "S") {
        topLogo.innerHTML = cards[i].substring(0, cards[i].length-1) + '<br>\u2660';
        bottomLogo.innerHTML = '\u2660<br>' + cards[i].substring(0, cards[i].length-1);
        centerLogo.innerHTML = '\u2660';   
        card.classList.add('spades');  
      }
      else if(cards[i][cards[i].length-1] === "D") {
        topLogo.innerHTML = cards[i].substring(0, cards[i].length-1) + '<br>\u2666';
        bottomLogo.innerHTML = '\u2666<br>' + cards[i].substring(0, cards[i].length-1);
        centerLogo.innerHTML = '\u2666'; 
        card.classList.add('diamonds');  
      }
      else if(cards[i][cards[i].length-1] === "C") {
        topLogo.innerHTML = cards[i].substring(0, cards[i].length-1) + '<br>\u2663';
        bottomLogo.innerHTML = '\u2663<br>' + cards[i].substring(0, cards[i].length-1);
        centerLogo.innerHTML = '\u2663'; 
        card.classList.add('clubs');  
      }
      // create a dom fragment
      let logoFragment = document.createDocumentFragment();
      //append fragments
      logoFragment.appendChild(topLogo); 
      logoFragment.appendChild(centerLogo); 
      logoFragment.appendChild(bottomLogo); 
      //append fragment to card
      card.appendChild(logoFragment);
      //push card into array of generated cards
      generated.push(card); 
    }
    //render generated cards into DOM 
    renderCards(generated); 
    //remove dealt cards from cards array
    removeDealtCards(cards); 
  }

  //play a card flip sound
  const playSound = () => {
    let audio = document.getElementById("card-sound");
    audio.play();
  }

  //deal cards when user clicks deal button
  const dealCards = (cards) => {
    //remove previously dealt pair of cards if present
    let cardContainer = document.getElementById('card-container'); 
    if(cardContainer !== null && cardContainer.childElementCount === 4) {
      cardContainer.remove(); 
    }
    //load up a new batch of cards if we have alreay dealt all 52 cards
    if(cards.length < 4) {
      alert('You have gone through the entire deck! Shuffling up a new batch!'); 
      initCards(); 
      dealCards(cards); 
      return; 
    }
    //if no previously dealt cards and we haven't dealt all 52 cards then generate 4 new cards
    generateCards(cards);
    playSound();  
  }

  const initCards = () => {
    //create 4 suits of 13 cards each
    createSuit(cards, "H"); 
    createSuit(cards, "S"); 
    createSuit(cards, "D"); 
    createSuit(cards, "C"); 
    //shuffle the array of cards into a random order
    shuffle(cards); 
    console.log("init", cards); 
  }

  ///////////////////
  //IMPLEMENTATION//
  /////////////////

  //initalize cards
  initCards(); 

  //add submit event listener
  let form = document.getElementById('deal-cards'); 
  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    dealCards(cards); 
  }); 

})();