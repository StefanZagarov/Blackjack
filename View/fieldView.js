// Everything related to displaying the values and cards

export const displayCard = function (person, card)
{
    const html = `<div class="${person.role}CardSlot">${card}</div>`;

    person.cardsElement.insertAdjacentHTML(`beforeend`, html);
};

export const updateMoney = function (role)
{
    role.moneyElement.textContent = role.money;
};

export const updateBetAmmount = function (player, betAmmount)
{
    player.betElement.textContent = betAmmount;
};

export const clearBetAmmount = function (player)
{
    player.betElement.textContent = 0;
};

export const updateHandValue = function (role)
{
    role.valueElement.textContent = role.handValue;
};
