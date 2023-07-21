
const isValidValue = function (value)
{
    if (value < 1)
    {
        editText(messageElement, `Invalid ammount!`);
        return;
    }

    if (value > player.money)
    {
        editText(messageElement, `Insufficient money!`);
        return;
    }

    if (value > dealer.money)
    {
        editText(messageElement, `Dealer can't pay you that much...poor guy`);
        return;
    }
};

player.money -= this.betAmmount;
editText(player.moneyElement, player.money);
editText(playerBetElement, this.betAmmount);

clearField(player, dealer, playerCardsElement, dealerCardsElement, messageElement);
displayGameButtons(standBtn, hitBnt, betBtn, betField);
this.initialDraw();
