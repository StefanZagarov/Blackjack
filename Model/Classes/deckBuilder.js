class Deck
{
    #cards = [`A`, 2, 3, 4, 5, 6, 7, 8, 9, 10, `J`, `Q`, `K`];
    #deck = [];
    // Testing purposes
    // #deck = [`A`, 7, `Q`, 5];
    // #deck = [7, `A`, 5, `Q`,];
    // #deck = [`A`, `A`, `Q`, `Q`,];

    constructor()
    {
        this.createDeck();
    }

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
    }

    #shuffleDeck()
    {
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

        return this.#deck;
    }

    drawCard()
    {
        return this.#deck.pop();
    }
}

export default new Deck();
