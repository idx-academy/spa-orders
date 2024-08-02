const categoryFilter = (category, productsList) => {
  if (category === "") {
    return productsList;
  }
  return productsList?.filter((product) => {
    return product.tags.includes(category);
  });
};

module.exports = {categoryFilter}
