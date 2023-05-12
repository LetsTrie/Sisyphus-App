const convertEngNumToBangNum = (amount) => {
  if (!amount) return amount;

  let engToBangNum = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯',
  };

  amount = amount.toString();
  let banglaAmount = '';
  for (let a of amount) banglaAmount += engToBangNum[a];

  return banglaAmount;
};

module.exports = convertEngNumToBangNum;
