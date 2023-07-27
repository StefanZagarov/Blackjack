export const bothNaturalPayment = function (player, betAmmount)
{
    player.money += betAmmount;
};

export const playerNaturalPayment = function (player, dealer, betAmmount)
{
    player.money += betAmmount * 2.5;
    dealer.money -= betAmmount * 1.5;
};

export const giveMoney = function (receiver, giver, betAmmount)
{
    if (receiver.role === `player`)
    {
        receiver.money += betAmmount * 2;
        giver.money -= betAmmount;
    }
    else
    {
        receiver.money += betAmmount;
    }
};
