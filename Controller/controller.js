//v0.7
console.log(`Get off the back stage ಠ_ಠ`);

import { player } from '../Model/Classes/player.js';
import dealer from '../Model/Classes/dealer.js';
import deck from '../Model/Classes/deckBuilder.js';
import { startingCurrencyForPlayer } from "../config/config.js";
import { startingCurrencyForDealer } from '../config/config.js';

import * as messageView from '../View/messageView.js';
import * as betView from '../View/betView.js';
import * as standView from '../View/standView.js';
import * as hitView from '../View/hitView.js';
import * as fieldView from '../View/fieldView.js';
import { addHandlerResetBtn } from '../View/resetView.js';
import { hasNatural } from '../Model/naturalsModel.js';
import * as paymentsModel from '../Model/paymentsModel.js';
import { tryReduceAceValue } from '../Model/tryReduceAceValueModel.js';

// Try to make a toggle between bet and field; stand and hit
let betAmmount;

const controlBetBtn = function ()
{
    // Replace this with creating the deck only when there are no cards left, just keep in mind that there are some cards still in play
    if (deck.checkForSplit())
    {
        deck.shufflePlayedCards(player, dealer);
    }

    controlClearField();

    betAmmount = betView.getFieldValue();

    if (betAmmount < 1)
    {
        messageView.showMessage(`Invalid ammount!`);
        return;
    }
    if (betAmmount > player.money)
    {
        messageView.showMessage(`Insufficient money!`);
        return;
    }
    if (betAmmount > dealer.money)
    {
        messageView.showMessage(`Dealer can't pay you that much...poor guy`);
        return;
    }

    // Clear message if there was any
    messageView.clearMessage();

    player.money -= betAmmount;

    fieldView.updateMoney(player);
    fieldView.updateBetAmmount(player, betAmmount);

    controlShowStandAndHitBtns();

    initialDraw();
};

const controlStandBtn = function ()
{
    controlRevealDealerSecondCard();

    while (dealer.handValue < 17)
    {
        controlDealerDraw();
        controlTryReduceAceValue(dealer);
        fieldView.updateHandValue(dealer);
    }

    if (dealer.handValue > 21 || player.handValue >= dealer.handValue)
    {
        messageView.showMessage(`You won!`);

        controlGiveMoney(player, dealer, betAmmount);
    }
    else
    {
        messageView.showMessage(`You lost!`);

        controlGiveMoney(dealer, player, betAmmount);
    }

    controlShowBetBtn();
};

const controlHitBtn = function ()
{
    controlPlayerDraw();

    controlTryReduceAceValue(player);

    if (player.handValue > 21)
    {
        messageView.showMessage(`Bust!`);

        controlGiveMoney(dealer, player, betAmmount);
        controlShowBetBtn();
    }
};

const controlResetBtn = function ()
{
    controlClearField();

    player.money = startingCurrencyForPlayer;
    dealer.money = startingCurrencyForDealer;

    controlUpdateMoney();

    deck.createDeck();

    controlShowBetBtn();
};


const controlShowStandAndHitBtns = function ()
{
    standView.displayStandBtn();
    hitView.displayHitBtn();

    betView.hideBetBtn();
};

const controlShowBetBtn = function ()
{
    fieldView.clearBetAmmount(player);

    betView.showBetBtn();

    standView.hideStandBtn();
    hitView.hideHitBtn();

    controlCheckForGameOver();
};


const controlPlayerDraw = function ()
{
    // Useless untill i rewrite it to not create a new deck for each round
    if (deck.checkForSplit())
    {
        deck.shufflePlayedCards(player, dealer);
    }

    const drawnCard = player.draw(deck);
    const cardValue = player.getCardValue(drawnCard);

    player.handValue += cardValue;
    controlTryReduceAceValue(player);

    fieldView.updateHandValue(player);
    fieldView.displayCard(player, drawnCard);
};

const controlDealerDraw = function ()
{
    // Useless untill i rewrite it to not create a new deck for each round
    if (deck.checkForSplit())
    {
        deck.shufflePlayedCards(player, dealer);
    }

    // Logic to hide the dealer's second card
    if (dealer.hand[0] && dealer.hand[1] === undefined)
    {
        const drawnCard = dealer.draw(deck);
        const cardValue = dealer.getCardValue(drawnCard);

        dealer.secondCardValue = cardValue;
        fieldView.displayCard(dealer, `?`);
    }
    else
    {
        const drawnCard = dealer.draw(deck);
        const cardValue = dealer.getCardValue(drawnCard);

        dealer.handValue += cardValue;
        controlTryReduceAceValue(dealer);

        fieldView.updateHandValue(dealer);
        fieldView.displayCard(dealer, drawnCard);
    }
};

const controlRevealDealerSecondCard = function ()
{
    dealer.cardsElement.removeChild(dealer.cardsElement.lastChild);

    fieldView.displayCard(dealer, dealer.hand[1]);
    dealer.handValue += dealer.secondCardValue;
    controlTryReduceAceValue(dealer);
    fieldView.updateHandValue(dealer);
};

const initialDraw = function ()
{
    controlPlayerDraw();
    controlDealerDraw();

    controlPlayerDraw();
    controlDealerDraw();

    controlCheckForNaturals();
};

const controlCheckForNaturals = function ()
{
    const playerHasNatural = hasNatural(player);
    const dealerHasNatural = hasNatural(dealer);

    if (playerHasNatural && dealerHasNatural)
    {
        messageView.showMessage(`Stand-off!`);
        controlRevealDealerSecondCard();
        controlBothNaturalPayment(player, betAmmount);

        controlShowBetBtn();
        return;
    }

    if (dealerHasNatural)
    {
        messageView.showMessage(`Dealer Blackjack!`);
        controlRevealDealerSecondCard();
        controlGiveMoney(dealer, player, betAmmount);

        controlShowBetBtn();
        return;
    }

    if (playerHasNatural)
    {
        messageView.showMessage(`Blackjack!`);
        controlRevealDealerSecondCard();
        controlPlayerNaturalPayment(player, dealer, betAmmount);

        controlShowBetBtn();
        return;
    }

    if (player.hand[0] === `A` && player.hand[1] === `A`)
    {
        player.aceCount--;
        player.handValue -= 10;

        fieldView.updateHandValue(player);
    }
};

const controlClearField = function ()
{
    player.hand = [];
    dealer.hand = [];

    player.handValue = 0;
    dealer.handValue = 0;

    fieldView.updateHandValue(player);
    fieldView.updateHandValue(dealer);

    player.aceCount = 0;
    dealer.aceCount = 0;

    while (player.cardsElement.firstChild)
    {
        player.cardsElement.removeChild(player.cardsElement.lastChild);
    }
    while (dealer.cardsElement.firstChild)
    {
        dealer.cardsElement.removeChild(dealer.cardsElement.lastChild);
    }
    // Alternative way to clear - might not be suitable for high-performance applications because it invokes the browser's HTML parser (though browsers may optimize for the case where the value is an empty string):
    // playerCardsElement.innerHTML = ``;
    // dealerCardsElement.innerHTML = ``;

    messageView.clearMessage();
};

const controlGiveMoney = function (receiver, giver, betAmmount)
{
    paymentsModel.giveMoney(receiver, giver, betAmmount);

    controlUpdateMoney();
};

const controlPlayerNaturalPayment = function (player, dealer, betAmmount)
{
    paymentsModel.playerNaturalPayment(player, dealer, betAmmount);

    controlUpdateMoney();
};

const controlBothNaturalPayment = function (player, betAmmount)
{
    paymentsModel.bothNaturalPayment(player, betAmmount);

    fieldView.updateMoney(player);
};

const controlTryReduceAceValue = function (participant)
{
    tryReduceAceValue(participant);
};

const controlCheckForGameOver = function ()
{
    if (dealer.money === 0.5)
    {
        messageView.showMessage(`Dealer forfeits so he can use his last money to go home to his family! You Win!`);

        betView.hideBetBtn();
    }
    if (dealer.money <= 0)
    {
        messageView.showMessage(`Congratulations! You made the dealer homeless!`);

        betView.hideBetBtn();
    }
    if (player.money <= 0)
    {
        messageView.showMessage(`You Died (kidding, you are just poor now)`);

        betView.hideBetBtn();
    }
};

const controlUpdateMoney = function ()
{
    fieldView.updateMoney(player);
    fieldView.updateMoney(dealer);
};

const init = function ()
{
    controlUpdateMoney();
    betView.addHandlerBetBtn(controlBetBtn);
    standView.addHandlerStandBtn(controlStandBtn);
    hitView.addHandlerHitView(controlHitBtn);
    addHandlerResetBtn(controlResetBtn);
};
init();



// TODO:
// 0. Refactor for MVC architecture - done, though im sure it's not ideal. Read the code, look for optimisations
// 1. Implement the missing rules
// 2. Add an explanation about the game and the rules of the hands
// 3. Save progress on browser exit
