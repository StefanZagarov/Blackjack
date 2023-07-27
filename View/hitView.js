const _hitBtn = document.getElementById(`hit`);

export const addHandlerHitView = function (handler)
{
    _hitBtn.addEventListener(`click`, handler);
};

export const displayHitBtn = function ()
{
    _hitBtn.style.visibility = `visible`;
};

export const hideHitBtn = function ()
{
    _hitBtn.style.visibility = `hidden`;
};
