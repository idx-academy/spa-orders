const setProductsPerPageSize = (screenWidth: number) => {
  if (screenWidth >= 1536) {
    return 10;
  } else if (screenWidth >= 1200) {
    return 12;
  } else if (screenWidth >= 900) {
    return 9;
  } else {
    return 10;
  }
};

export default setProductsPerPageSize;
