export default function (player, dealer, playerCardsElement, dealerCardsElement, messageElement)
{
    player.hand = [];
    dealer.hand = [];

    player.handValue = 0;
    dealer.handValue = 0;

    while (playerCardsElement.firstChild)
    {
        playerCardsElement.removeChild(playerCardsElement.lastChild);
    }
    while (dealerCardsElement.firstChild)
    {
        dealerCardsElement.removeChild(dealerCardsElement.lastChild);
    }
    // Alternative way to clear - might not be suitable for high-performance applications because it invokes the browser's HTML parser (though browsers may optimize for the case where the value is an empty string):
    // playerCardsElement.innerHTML = ``;
    // dealerCardsElement.innerHTML = ``;

    editText(messageElement, ``);
};
