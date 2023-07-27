export const isValidValue = function (player, dealer, value)
{
    if (value < 1)
    {
        return `Invalid ammount!`;
    }

    if (value > player.money)
    {
        return `Insufficient money!`;
    }

    if (value > dealer.money)
    {
        return `Dealer can't pay you that much...poor guy`;
    }

    return ``;
};
