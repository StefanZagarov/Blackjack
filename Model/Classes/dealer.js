import Participant from './participant.js';
import { startingCurrencyForDealer } from '../../config/config.js';

class Dealer extends Participant
{
    moneyElement = document.querySelector(`.dealerMoney`);
    cardsElement = document.querySelector(`.dealerCards`);
    valueElement = document.getElementById(`dealerValue`);
    role = `dealer`;

    secondCardValue;

    constructor(startingMoney)
    {
        super();
        this.money = startingMoney;
    }

    revealSecondCard()
    {
        this.handValue += this.secondCardValue;
        this.cardsElement.removeChild(this.cardsElement.lastChild);
    }
}

export default new Dealer(startingCurrencyForDealer);
