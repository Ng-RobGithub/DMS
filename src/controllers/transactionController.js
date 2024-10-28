const Transaction = require('../models/Transaction');
import { v4 as uuidv4 } from 'uuid';
import convertNaira from '../config/helper';
const Cart = require('../models/Cart');
const api = require('../config/axios');

// localhost:5000/api/v1/carts/:id/transactions
async function getTransactions(req, res) {
  try {
    const transaction = await Transaction.find({});

    return res.status(200).json(transaction);
  } catch (e) {
    res.status(404).json({ message: 'Transactions not found' });
    throw new Error(e);
  }
}

async function createTransaction(req, res) {
  const cartId = req.params.id;

  const cart = Cart.findById(cartId).populate('user');

  if (!cart) res.status(404).json({ message: 'Cart not found' });

  const transaction = await Transaction.create({
    ...req.body,
    transactionId: `NG-${uuidv4()}`,
    status: 'Active',
    cartId: cart._id,
    amount: convertNaira(cart.totalPrice),
    currency: 'NGN',
    metaData: {
      cartItems: cart.items.map((item) => ({
        itemId: item.id,
        itemPrice: item.price,
        itemQuantity: item.quantity,
      })),
    },
  });

  if (!transaction) {
    return res.status(400).json({ message: 'Error creating transaction' });
  }

  try {
    const response = await api.post('/initialize', {
      amount: transaction.amount,
      reference: transaction.transactionId,
      email: cart.user.email,
    });

    transaction.paymentResponse = response.data;
    await transaction.save();

    return res.status(200).json({ message: 'Transaction initialized.', response });
  } catch (error) {
    return res.status(500).json({ message: 'Error initializing payment', error: error.message });
  }
}

async function verifyTransaction(req, res) {
  try {
    const { transactionId } = req.params;
    const payment = api.get(`verify/${transactionId}`);
    if (!payment)
      res.status(400).json({
        message: 'Something happened please verify that the transaction id was sent succesfully',
      });
    return res.status(200).json(payment);
  } catch (e) {
    res.status(400);
    throw new Error(e);
  }
}

module.exports = {
  getTransactions,
  createTransaction,
  verifyTransaction,
};
