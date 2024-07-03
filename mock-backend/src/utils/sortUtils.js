const sortProducts = (products, sort) => {
  let sortedProducts = [...products];
  const [sortKey, sortOrder] = sort.split(',');

  sortedProducts.sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === 'price' || sortKey === 'id') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (sortKey === 'createdAt') {
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return sortedProducts;
};

module.exports = { sortProducts };
