_resetBtn = document.querySelector(`.reset`);

export const addHandlerResetBtn = function (handler)
{
    _resetBtn.addEventListener(`click`, handler);
};
