class ResetView
{
    resetBtn = document.querySelector(`.reset`);

    clearField(player, dealer, playerCardsElement, dealerCardsElement, messageElement);

    // editText(player.valueElement, `0`);
    // // editText(`0`);
    // betField.value = ``;

    // player.money = startingCurrencyForPlayer;
    // dealer.money = startingCurrencyForDealer;

    // editText(player.moneyElement, player.money);
    // editText(dealer.moneyElement, dealer.money);

    // deck.createDeck();

    displayBetButton(standBtn, hitBnt, betBtn, betField, playerBetElement);
    showBetButton(betBtn, betField);
}
