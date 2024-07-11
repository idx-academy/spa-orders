const cartItems = require('../data/mockedCartItems');

const getCartItems = (req, res) => {
    res.status(200).json(cartItems);
};

const addToCart = (req, res) => {
    res.json()
}

const removeFromCart = (req, res) => {
    res.json()
}

module.exports = { getCartItems, addToCart, removeFromCart }