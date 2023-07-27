export default class Participant
{
    hand = [];
    handValue = 0;
    aceCount = 0;
    money;

    draw(deck)
    {
        const drawnCard = deck.drawCard();

        if (drawnCard === `A`)
        {
            this.aceCount++;
        }

        this.hand.push(drawnCard);

        return drawnCard;
    }

    getCardValue = function (cardValue)
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
}
