const _standBtn = document.getElementById(`stand`);

export const addHandlerStandBtn = function (handler)
{
    _standBtn.addEventListener(`click`, handler);
};

// Try to make a hidden class and toggle it
export const displayStandBtn = function ()
{
    _standBtn.style.visibility = `visible`;
};

export const hideStandBtn = function ()
{
    _standBtn.style.visibility = `hidden`;
};
