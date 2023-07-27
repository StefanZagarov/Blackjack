class Deck
{
    #cards = [`A`, 2, 3, 4, 5, 6, 7, 8, 9, 10, `J`, `Q`, `K`];
    #deck = [];
    // Testing purposes
    // #deck = [`A`, 7, `Q`, 5];
    // #deck = [7, `A`, 5, `Q`,];
    // #deck = [`A`, `A`, `Q`, `Q`,];
    // #deck = [`A`, 2, 3, 4, 5, 6, 7, 8, 9, 10, `J`, `Q`, `K`, 2, 3, 4, 5, 6];

    #createCards()
    {
        this.#deck = [];
        for (let suit = 0; suit < 4; suit++)
        {
            for (let card = 0; card < this.#cards.length; card++)
            {
                this.#deck.push(this.#cards[card]);
            }
        }

        this.#deck.push(`split`);
    }

    constructor()
    {
        this.createDeck();
    }

    #shuffleDeck()
    {
        // Maybe make the shuffle ammount random, from 7 to 1000
        for (let i = 0; i < 1000; i++)
        {
            let location1 = Math.floor((Math.random() * this.#deck.length));
            let location2 = Math.floor((Math.random() * this.#deck.length));
            let tmp = this.#deck[location1];

            this.#deck[location1] = this.#deck[location2];
            this.#deck[location2] = tmp;
        }
    }

    createDeck()
    {
        this.#createCards();
        this.#shuffleDeck();
    }

    drawCard()
    {
        return this.#deck.pop();
    }

    shufflePlayedCards(player, dealer)
    {
        this.createDeck();


        // Remove the cards currently in play from the newly created deck
        player.hand.forEach(card =>
        {
            const indexOfCard = this.#deck.indexOf(card);
            this.#deck.splice(indexOfCard, 1);
        });

        dealer.hand.forEach(card =>
        {
            const indexOfCard = this.#deck.indexOf(card);
            this.#deck.splice(indexOfCard, 1);
        });
    }

    checkForSplit()
    {
        return this.#deck.at(-1) === `split` ? true : false;
    }
}

export default new Deck();
