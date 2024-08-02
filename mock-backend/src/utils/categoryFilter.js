const categoryFilter = (category, productsList) => !category ? productsList : productsList?.filter(product => product.tags.includes(category))
module.exports = {categoryFilter}
