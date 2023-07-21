import { startingCurrencyForPlayer } from "../config/config.js";

export class Player
{
    playerMoneyElement = document.querySelector(`.playerMoney`);
    playerCardsElement = document.querySelector(`.playerCards`);
    playerValueElement = document.getElementById(`playerValue`);

    type = `player`;

    hand = [];
    handValue = 0;
    aceCount = 0;
    money;

    moneyElement;
    valueElement;

    constructor(startingMoney)
    {
        this.money = startingMoney;
    }

    draw(deck, app, playerCardsElement)
    {
        const drawnCard = deck.drawCard();
        const cardValue = app.checkValue(drawnCard); // Rather return the value, perhaps split the function

        if (drawnCard === `A`)
        {
            this.aceCount++;
        }

        this.handValue += cardValue;

        displayCard(this, playerCardsElement, drawnCard);
        editText(this.valueElement, this.handValue);

        this.hand.push(drawnCard);
    }
}

export const player = new Player(startingCurrencyForPlayer);
