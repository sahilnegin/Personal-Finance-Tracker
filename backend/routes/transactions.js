import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, type, limit = 50, sort = '-date' } = req.query;
    
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    const transactions = await Transaction.find(query)
      .sort(sort)
      .limit(parseInt(limit));
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;
    
    if (!title || !amount || !category || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const transaction = new Transaction({
      title,
      amount: parseFloat(amount),
      category,
      type
    });
    
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;
    
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    if (title) transaction.title = title;
    if (amount) transaction.amount = parseFloat(amount);
    if (category) transaction.category = category;
    if (type) transaction.type = type;
    
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats/summary', async (req, res) => {
  try {
    const totalIncome = await Transaction.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalExpenses = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const categoryStats = await Transaction.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    
    const monthlyStats = await Transaction.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);
    
    res.json({
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      balance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      categoryStats,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 