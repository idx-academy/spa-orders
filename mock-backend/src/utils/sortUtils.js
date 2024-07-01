const sortProducts = (products, sort) => {
  let sortedProducts = [...products];

  switch (sort) {
    case "recommended":
      sortedProducts.sort((a, b) => a.id.localeCompare(b.id)); // - it's just for a placeholder no more
      break;
    case "newest":
      sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case "priceLowHigh":
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "priceHighLow":
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "nameAZ":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameZA":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return sortedProducts;
};

module.exports = { sortProducts };
