export const hasNatural = function (participant)
{
    if (participant.hand.find(element => element === `A`))
    {
        if (participant.hand.find(element => element === `K`) || participant.hand.find(element => element === `Q`) ||
            participant.hand.find(element => element === `J`) || participant.hand.find(element => element === 10))
        {
            return true;
        }
    }
    return false;
};
