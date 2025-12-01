const { addToCart, getCartItems } = require('../Controller/cartController');

const cartRouter = require('express').Router();

cartRouter.post('/add', addToCart);
cartRouter.get('/', getCartItems);
module.exports = cartRouter;