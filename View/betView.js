class Bet
{
    _betBtn = document.getElementById(`bet`);
    _betField = document.getElementById(`betField`);

    addHandlerDisplayBetBtn(handler)
    {
        this._betBtn.addEventListener(`click`, handler);
    }

    showBetBtn()
    {
        standBtn.style.visibility = `hidden`;
        hitBnt.style.visibility = `hidden`;

        betBtn.style.visibility = `visible`;
        betField.style.visibility = `visible`;
        editText(playerBetElement, `0`);
    }

    hideBetBtn()
    {
        betBtn.style.visibility = `hidden`;
        betField.style.visibility = `hidden`;
    }

    getFieldValue()
    {
        return Number(this._betField.value);
    }

}

export default new Bet();
