const express = require('express');
const {
  createShopItem,
  updateShopItem,
  deleteShopItem,
  getShopItems,
  getShopItem
} = require('../controllers/shopController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/shop-items', authenticateToken, createShopItem);
router.put('/shop-items/:id', authenticateToken, updateShopItem);
router.delete('/shop-items/:id', authenticateToken, deleteShopItem);
router.get('/shop-items', getShopItems);
router.get('/shop-items/:id', getShopItem);

module.exports = router;
