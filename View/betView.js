_betBtn = document.getElementById(`bet`);
_betField = document.getElementById(`betField`);

export const addHandlerBetBtn = function (handler)
{
    _betBtn.addEventListener(`click`, handler);
};

export const showBetBtn = function ()
{
    _betBtn.style.visibility = `visible`;
    _betField.style.visibility = `visible`;
};

export const hideBetBtn = function ()
{
    _betBtn.style.visibility = `hidden`;
    _betField.style.visibility = `hidden`;
};

export const getFieldValue = function ()
{
    return Number(_betField.value);
};
