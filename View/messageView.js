const messageElement = document.querySelector(`.message`);

export const showMessage = function (text)
{
    messageElement.textContent = text;
};

export const clearMessage = function ()
{
    messageElement.textContent = ``;
};
