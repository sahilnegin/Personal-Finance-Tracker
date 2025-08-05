import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from './models/Transaction.js';

dotenv.config({ path: './config.env' });

const sampleTransactions = [
  {
    title: 'Salary',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Freelance Project',
    amount: 1200,
    category: 'Freelance',
    type: 'income',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Grocery Shopping',
    amount: 150,
    category: 'Food',
    type: 'expense',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Gas Station',
    amount: 45,
    category: 'Transportation',
    type: 'expense',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Netflix Subscription',
    amount: 15,
    category: 'Entertainment',
    type: 'expense',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Electric Bill',
    amount: 120,
    category: 'Bills',
    type: 'expense',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Investment Dividend',
    amount: 300,
    category: 'Investment',
    type: 'income',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Restaurant Dinner',
    amount: 85,
    category: 'Food',
    type: 'expense',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Transaction.deleteMany({});
    console.log('Cleared existing transactions');
    
    await Transaction.insertMany(sampleTransactions);
    console.log('Sample data inserted successfully');
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 