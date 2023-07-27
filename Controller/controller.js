//v0.7.5
console.log(`Get off the back stage ಠ_ಠ`);

import { player } from '../Model/Classes/player.js';
import dealer from '../Model/Classes/dealer.js';
import deck from '../Model/Classes/deckBuilder.js';

import * as messageView from '../View/messageView.js';
import * as betView from '../View/betView.js';
import * as standView from '../View/standView.js';
import * as hitView from '../View/hitView.js';
import * as betModel from '../Model/betModel.js';
import * as fieldView from '../View/fieldView.js';
import { hasNatural } from '../Model/naturalsModel.js';
import * as paymentsModel from '../Model/paymentsModel.js';
import { tryReduceAceValue } from '../Model/tryReduceAceValueModel.js';

// All "player" or "participant" names referring to both roles should be changed to "role"

// Try to make a toggle between bet and field; stand and hit
let betAmmount;

const controlDisplayStandAndHitBtns = function ()
{
    standView.displayStandBtn();
    hitView.displayHitBtn();

    betView.hideBetBtn();
};

const controlShowBetBtn = function ()
{
    betView.showBetBtn();

    standView.hideStandBtn();
    hitView.hideHitBtn();
};

const controlBetBtn = function ()
{
    betAmmount = betView.getFieldValue();

    const isValidValue = betModel.isValidValue(player, dealer, betAmmount);
    if (isValidValue !== ``)
    {
        messageView.showMessage(isValidValue);
        return;
    }
    // Clear message if there was any
    messageView.clearMessage();

    player.money -= betAmmount;

    fieldView.updateMoney(player);
    fieldView.updateBetAmmount(player, betAmmount);

    // Replace this with creating the deck only when there are no cards left, just keep in mind that there are some cards still in play
    // if (deck.getRemainingCards < 12(for example)) deck.createDeck();
    deck.createDeck();

    controlDisplayStandAndHitBtns();

    initialDraw();
};

const controlTryReduceAceValue = function (participant)
{
    tryReduceAceValue(participant);
    messageView.showMessage(participant.valueElement, participant.handValue);
};

const controlStandBtn = function ()
{
    controlRevealDealerSecondCard();

    while (dealer.handValue < 17)
    {
        controlDealerDraw();
        controlTryReduceAceValue(dealer);
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
};

// Try to put draws in Model
const controlPlayerDraw = function ()
{
    const drawnCard = player.draw(deck);
    const cardValue = player.getCardValue(drawnCard);

    player.handValue += cardValue;
    fieldView.updateHandValue(player);
    fieldView.displayCard(player, drawnCard);
};

const controlDealerDraw = function ()
{
    // Logic to hide the dealer's second card
    if (dealer.hand[0] && dealer.hand[1] === undefined)
    {
        const drawnCard = dealer.draw(deck);
        const cardValue = dealer.getCardValue(drawnCard);

        dealer.secondCard = drawnCard;
        dealer.secondCardValue = cardValue;
        fieldView.displayCard(dealer, `?`);
    }
    else
    {
        const drawnCard = dealer.draw(deck);
        const cardValue = dealer.getCardValue(drawnCard);

        dealer.handValue += cardValue;
        fieldView.updateHandValue(dealer);
        fieldView.displayCard(dealer, drawnCard);
    }
    console.log(dealer.hand);
};

const controlRevealDealerSecondCard = function ()
{
    dealer.cardsElement.removeChild(dealer.cardsElement.lastChild);
    fieldView.displayCard(dealer, dealer.secondCard);
    dealer.handValue += dealer.secondCardValue;
    fieldView.updateHandValue(dealer);
    controlTryReduceAceValue(dealer);
};

const initialDraw = function ()
{
    // Useless untill i rewrite it to not create a new deck for each round
    if (deck.length < 12)
    {
        deck.createDeck();
    }

    controlPlayerDraw();
    controlDealerDraw();

    controlPlayerDraw();
    controlDealerDraw();


    const playerHasNatural = hasNatural(player);
    const dealerHasNatural = hasNatural(dealer);

    if (playerHasNatural && dealerHasNatural)
    {
        messageView.showMessage(`Stand - off!`);
        controlRevealDealerSecondCard();
        paymentsModel.bothNaturalPayment(betAmmount);

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
        paymentsModel.playerNaturalPayment(player, dealer, betAmmount);

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
        messageView.showMessage(`You Died (jk you are just poor now)`);

        betView.hideBetBtn();
    }
};

const controlClearField = function ()
{
    player.hand = [];
    dealer.hand = [];

    player.handValue = 0;
    dealer.handValue = 0;

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

    //Clear message field also
};

const controlGiveMoney = function (receiver, giver, betAmmount)
{
    paymentsModel.giveMoney(receiver, giver, betAmmount);

    fieldView.updateMoney(player);
    fieldView.updateMoney(dealer);

    controlCheckForGameOver();
};

const controlPlayerNaturalPayment = function (player, dealer)
{
    paymentsModel.playerNaturalPayment(player, dealer);

    fieldView.updateMoney(player);
    fieldView.updateMoney(dealer);

    controlCheckForGameOver();
};

const controlBothNaturalPayment = function ()
{
    paymentsModel.bothNaturalPayment();

    fieldView.updateMoney(player);
};

const resetGame = function ()
{
    clearField(player, dealer, playerCardsElement, dealerCardsElement, messageElement);

    editText(player.valueElement, `0`);
    betField.value = ``;

    player.money = startingCurrencyForPlayer;
    dealer.money = startingCurrencyForDealer;

    editText(player.moneyElement, player.money);
    editText(dealer.moneyElement, dealer.money);

    deck.createDeck();

    displayBetButton(standBtn, hitBnt, betBtn, betField, playerBetElement);
    showBetButton(betBtn, betField);
};

const init = function ()
{
    fieldView.updateMoney(player);
    fieldView.updateMoney(dealer);
    betView.addHandlerBetBtn(controlBetBtn);
    standView.addHandlerStandBtn(controlStandBtn);
};
init();





// TODO:
// 0. Refactor for MVC architecture
// 1. Implement the missing rules
// 2. Add an explanation about the game and the rules of the hands
// 3. Rewrite to not create a new deck each round
// 4. Save progress on browser exit
