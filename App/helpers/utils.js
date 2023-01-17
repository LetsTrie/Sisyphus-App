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

function getFormattedDate(date) {
  date = new Date(date);
  let year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
}

export { engToBanNumConversion, getFormattedDate };
