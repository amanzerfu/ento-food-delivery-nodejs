const pool = require('../config/db');

const createShopItem = async (req, res) => {
  const { imageurl, name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO shop_items (imageurl, name, description) VALUES ($1, $2, $3) RETURNING *',
      [imageurl, name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateShopItem = async (req, res) => {
  const { id } = req.params;
  const { imageurl, name, description, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE shop_items SET imageurl = $1, name = $2, description = $3, status = $4 WHERE id = $5 RETURNING *',
      [imageurl, name, description, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shop item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteShopItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM shop_items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shop item not found' });
    }
    res.json({ message: 'Shop item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getShopItems = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const result = await pool.query(
      'SELECT * FROM shop_items ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [parseInt(limit), offset]
    );
    const totalResult = await pool.query('SELECT COUNT(*) FROM shop_items');
    const totalItems = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      items: result.rows,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getShopItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM shop_items WHERE id = $1',
      [parseInt(id)]
    );
    const totalResult =1
    const totalItems = 1
    const totalPages = 1

    res.json({
      items: result.rows,
      totalPages,
      currentPage: 1,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createShopItem, updateShopItem, deleteShopItem, getShopItems,getShopItem };
