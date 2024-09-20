const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentReference: { type: String, required: true },
    paymentDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    truckSize: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryState: { type: String, required: true },
    deliveryCountry: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    parentOrderNumber: { type: String, unique: true, required: true },
    status: { type: String, default: 'Pending' }, // Order status (e.g., Pending, Completed)
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Order', orderSchema);
