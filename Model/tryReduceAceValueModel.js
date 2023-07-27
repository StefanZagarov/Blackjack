export const tryReduceAceValue = function (participant)
{
    if (participant.handValue > 21 && participant.aceCount > 0)
    {
        participant.handValue -= 10;
        participant.aceCount--;
    }
};
