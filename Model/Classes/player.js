import Participant from './participant.js';
import { startingCurrencyForPlayer } from "../../config/config.js";

class Player extends Participant
{
    moneyElement = document.querySelector(`.playerMoney`);
    betElement = document.getElementById(`playerBet`);
    cardsElement = document.querySelector(`.playerCards`);
    valueElement = document.getElementById(`playerValue`);

    role = `player`;

    constructor(startingMoney)
    {
        super();
        this.money = startingMoney;
    }
}

export const player = new Player(startingCurrencyForPlayer);
