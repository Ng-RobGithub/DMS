// src/controllers/cartController.js
const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [{ product: productId, quantity, price }], totalPrice: quantity * price });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = price;
      } else {
        cart.items.push({ product: productId, quantity, price });
      }
      cart.totalPrice += quantity * price;
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
