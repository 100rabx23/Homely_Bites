import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered'],
    default: 'pending'
  },
  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deliveryAddress: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  estimatedDeliveryTime: Date,
  createdAt: { type: Date, default: Date.now }
});

orderSchema.index({ location: '2dsphere' });

export default mongoose.model('Order', orderSchema);