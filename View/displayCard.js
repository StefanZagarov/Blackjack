export default function (participant, cardsElement, cardValue)
{
    const html = `<div class="${participant.type}CardSlot">${cardValue}</div>`;

    cardsElement.insertAdjacentHTML(`beforeend`, html);
};
