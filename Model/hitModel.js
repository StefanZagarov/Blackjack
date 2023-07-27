export const hit = function (deck, playerCardsElement, player, dealer, standBtn, hitBnt, betBtn, betField, playerBetElement, messageElement)
{
    player.draw(deck, this, playerCardsElement, player.valueElement);

    this.tryReduceAceValue(player);

    if (player.handValue > 21)
    {
        editText(messageElement, `Bust!`);

        this.giveMoney(dealer, player);
        displayBetButton(standBtn, hitBnt, betBtn, betField, playerBetElement);
    }
};
