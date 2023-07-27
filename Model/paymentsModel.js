export const bothNaturalPayment = function (betAmmount)
{
    player.money += betAmmount;

    console.log(`Both natural payment ${betAmmount}`);
};

export const playerNaturalPayment = function (player, dealer, betAmmount)
{
    player.money += betAmmount * 2.5;
    dealer.money -= betAmmount * 1.5;

    console.log(`Player natural payment. ${betAmmount}`);
};

export const giveMoney = function (receiver, giver, betAmmount)
{
    if (receiver.type === `player`)
    {
        receiver.money += betAmmount * 2;
        giver.money -= betAmmount;
    }
    else
    {
        receiver.money += betAmmount;
    }

    console.log(`Give money to ${receiver}, from ${giver}. ${betAmmount}`);
};
