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

export const updateBetAmmount = function (role, betAmmount)
{
    role.betElement.textContent = betAmmount;
};

export const updateHandValue = function (role)
{
    role.valueElement.textContent = role.handValue;
};
