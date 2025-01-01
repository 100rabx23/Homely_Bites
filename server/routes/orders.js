import express from 'express';
import Order from '../models/Order.js';
import { auth } from '../middleware/auth.js';
import { io } from '../socket.js';

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, deliveryAddress, location } = req.body;
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = new Order({
      user: req.user.userId,
      items,
      total,
      deliveryAddress,
      location
    });

    await order.save();
    
    // Notify available delivery partners
    io.emit('newOrder', { orderId: order._id });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.menuItem')
      .populate('deliveryPartner', 'name phone');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (for delivery partners)
router.patch('/:orderId/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.deliveryPartner?.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    order.status = status;
    if (status === 'delivered') {
      order.deliveredAt = Date.now();
    }
    
    await order.save();
    
    // Notify user about status update
    io.to(order.user.toString()).emit('orderUpdate', {
      orderId: order._id,
      status
    });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;