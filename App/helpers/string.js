const createSlug = (str) => {
  return str.toLowerCase().split(' ').join('-');
};

export { createSlug };
