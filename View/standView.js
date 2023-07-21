export default function (standBtn, hitBnt, betBtn, betField, playerBetElement, dealerCardsElement, deck, dealer, player, messageElement)
{
    displayBetButton(standBtn, hitBnt, betBtn, betField, playerBetElement);

    dealer.revealSecondCard(dealerCardsElement, this);

    while (dealer.handValue < 17)
    {
        dealer.draw(deck, this, dealerCardsElement, dealer.valueElement);
        this.tryReduceAceValue(dealer);
    }

    if (dealer.handValue > 21 || player.handValue >= dealer.handValue)
    {
        editText(messageElement, `You won!`);
        this.giveMoney(player, dealer);
    }
    else
    {
        editText(messageElement, `You lost!`);
        this.giveMoney(dealer, player);
    }
};
