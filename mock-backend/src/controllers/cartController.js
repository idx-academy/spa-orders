const products = require("../data/mokedData");

let store = [];

const getCartItems = (req, res) => {
  const price = store.reduce((acc, item) => acc + item.calculatedPrice, 0)

  const responseBody = {
    totalPrice: price,
    items: store
  };

  res.status(200).json(responseBody);
};

const addToCart = (req, res) => {
  const item = products.find((product) => product.id === req.params.productId);

  store.push({
    productId: item.id,
    image: item.image,
    name: item.name,
    productPrice: item.price,
    quantity: 1,
    calculatedPrice: item.price
  });

  res.json();
};

const removeFromCart = (req, res) => {
  store = store.filter((item) => item.productId !== req.params.productId);

  res.json();
};

module.exports = { getCartItems, addToCart, removeFromCart };
