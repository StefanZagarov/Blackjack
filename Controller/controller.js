import { player } from '../Model/player.js';
import dealer from '../Model/dealer.js';
import deck from '../Model/deckBuilder.js';
import betView from '../View/betView.js';

const displayGameButtons = function ()
{
    standBtn.style.visibility = `visible`;
    hitBnt.style.visibility = `visible`;

    betBtn.style.visibility = `hidden`;
    betField.style.visibility = `hidden`;
};

const controlBetBtn = function ()
{
    betView.getFieldValue();

    // Replace this with creating the deck only when there are no cards left
    deck.createDeck();

    console.log(deck);
};

const init = function ()
{
    betView.addHandlerDisplayBetBtn(controlBetBtn);
    console.log(player);
    console.log(dealer);
};
init();





const initialDraw = function ()
{
    // Useless untill i rewrite it to not create a new deck for each round
    if (this.deck.length < 12)
    {
        this.deck.createDeck();
    }

    this.player.draw(this.deck, this, this.playerCardsElement, this.player.valueElement);
    this.dealer.draw(this.deck, this, this.dealerCardsElement, this.dealer.valueElement);

    this.player.draw(this.deck, this, this.playerCardsElement, this.player.valueElement);
    this.dealer.draw(this.deck, this, this.dealerCardsElement, this.dealer.valueElement);


    const playerHasNatural = this.checkForNatural(this.player);
    const dealerHasNatural = this.checkForNatural(this.dealer);

    if (playerHasNatural && dealerHasNatural)
    {
        editText(this.messageElement, `Stand - off!`);
        this.bothNaturalPayment();
        displayBetButton(this.standBtn, this.hitBnt, this.betBtn, this.betField, this.playerBetElement);
        this.dealer.revealSecondCard(this.dealerCardsElement, this);
        return;
    }

    if (dealerHasNatural)
    {
        editText(this.messageElement, `Dealer Blackjack!`);
        displayBetButton(this.standBtn, this.hitBnt, this.betBtn, this.betField, this.playerBetElement);
        this.dealer.revealSecondCard(this.dealerCardsElement, this);
        this.giveMoney(this.dealer, this.player);
        return;
    }

    if (playerHasNatural)
    {
        editText(this.messageElement, `Blackjack!`);
        displayBetButton(this.standBtn, this.hitBnt, this.betBtn, this.betField, this.playerBetElement);
        this.dealer.revealSecondCard(this.dealerCardsElement, this);
        this.playerNaturalPayment();
        return;
    }

    if (this.player.hand[0] === `A` && this.player.hand[1] === `A`)
    {
        this.player.aceCount--;
        this.player.handValue -= 10;

        editText(this.player.valueElement, this.player.handValue);
    }
};

const giveMoney = function (receiver, giver)
{
    if (receiver.type === `player`)
    {
        receiver.money += this.betAmmount * 2;
        giver.money -= this.betAmmount;
    }
    else
    {
        receiver.money += this.betAmmount;
    }

    editText(receiver.moneyElement, receiver.money);
    editText(giver.moneyElement, giver.money);

    this.resetAceCounters();
    this.checkForGameOver();
};

const constplayerNaturalPayment = function ()
{
    this.player.money += this.betAmmount * 2.5;
    this.dealer.money -= this.betAmmount * 1.5;

    editText(this.player.moneyElement, this.player.money);
    editText(this.dealer.moneyElement, this.dealer.money);

    this.resetAceCounters();
    this.checkForGameOver();
};

const bothNaturalPayment = function ()
{
    this.player.money += this.betAmmount;

    editText(this.player.moneyElement, this.player.money);

    this.resetAceCounters();
};

const checkValue = function (cardValue)
{
    if (cardValue === `A`)
    {
        cardValue = 11;
    }
    else if (cardValue === `J` || cardValue === `Q` || cardValue === `K`)
    {
        cardValue = 10;
    }

    return cardValue;
};

const checkForGameOver = function ()
{
    if (this.dealer.money === 0.5)
    {
        editText(this.messageElement, `Dealer forfeits so he can use his last money to go home to his family! You Win!`);

        hideBetButton(this.betBtn, this.betField);
    }
    if (this.dealer.money <= 0)
    {
        editText(this.messageElement, `Congratulations! You made the dealer homeless!`);

        hideBetButton(this.betBtn, this.betField);
    }
    if (this.player.money <= 0)
    {
        editText(this.messageElement, `You Died (jk you just poor now)`);

        hideBetButton(this.betBtn, this.betField);
    }
};

const tryReduceAceValue = function (participant)
{
    if (participant.handValue > 21 && participant.aceCount > 0)
    {
        participant.handValue -= 10;
        participant.aceCount--;
        editText(participant.valueElement, participant.handValue);
    }
};

const checkForNatural = function (participant)
{
    if (participant.hand.find(element => element === `A`))
    {
        if (participant.hand.find(element => element === `K`) || participant.hand.find(element => element === `Q`) ||
            participant.hand.find(element => element === `J`) || participant.hand.find(element => element === 10))
        {
            return true;
        }
    }
    return false;
};

const resetAceCounters = function ()
{
    this.player.aceCount = 0;
    this.dealer.aceCount = 0;
};
