import { Player } from './player.js';
import { startingCurrencyForDealer } from '../config/config.js';

class Dealer extends Player
{
    dealerMoneyElement = document.querySelector(`.dealerMoney`);
    dealerCardsElement = document.querySelector(`.dealerCards`);
    dealerValueElement = document.getElementById(`dealerValue`);

    type = `dealer`;
    #secondCardValue;

    constructor(startingMoney, hand, handValue, moneyElement, valueElement)
    {
        super(startingMoney, hand, handValue, moneyElement, valueElement);
    }

    draw(deck)
    {
        const drawnCard = deck.drawCard();
        const cardValue = app.checkValue(drawnCard); // Rather return the value, perhaps split the function

        if (drawnCard === `A`)
        {
            this.aceCount++;
        }

        // Logic to hide the dealer's second card
        if (this.hand[0] && this.hand[1] === undefined)
        {
            this.hand.push(drawnCard);
            this.#secondCardValue = cardValue;
            displayCard(this, this.dealerCardsElement, `?`);

            return;
        }

        this.handValue += cardValue;

        displayCard(this, dealerCardsElement, drawnCard);
        editText(this.valueElement, this.handValue);

        this.hand.push(drawnCard);
    }

    revealSecondCard(dealerCardsElement, app)
    {
        this.handValue += this.#secondCardValue;
        dealerCardsElement.removeChild(dealerCardsElement.lastChild);
        displayCard(this, dealerCardsElement, this.hand[1]);
        editText(this.valueElement, this.handValue);
        app.tryReduceAceValue(this);
    }
}

export default new Dealer(startingCurrencyForDealer);
