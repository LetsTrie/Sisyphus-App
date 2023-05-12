const encrypt = (data) => {
  if (!data) return '';
  if (Array.isArray(data)) return data.join('-');
  return data;
};

module.exports = {
  encrypt,
};
