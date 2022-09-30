const banglaNumbers = [
  '০',
  '১',
  '২',
  '৩',
  '৪',
  '৫',
  '৬',
  '৭',
  '৮',
  '৯',
];

const engToBanNumConversion = (engNum) => {
  if (typeof engNum !== 'number') return engNum;
  if (isNaN(engNum)) return engNum;
  let banglaNumber = '';
  engNum = `${engNum}`;
  for (let char of engNum) {
    banglaNumber += banglaNumbers[parseInt(char)];
  }
  return banglaNumber;
};

export { engToBanNumConversion };
