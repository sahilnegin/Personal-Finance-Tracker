# Personal Finance Tracker Backend

A Node.js/Express backend with MongoDB for the Personal Finance Tracker application.

## Features

- RESTful API for transaction management
- MongoDB database integration
- CRUD operations for transactions
- Advanced filtering and sorting
- Statistical aggregations
- Security middleware (Helmet, CORS, Rate limiting)
- Error handling and validation

## API Endpoints

### Transactions

- `GET /api/transactions` - Get all transactions (with optional filters)
- `GET /api/transactions/:id` - Get a specific transaction
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/stats/summary` - Get financial statistics

### Query Parameters

- `category` - Filter by category (e.g., "Food", "Salary")
- `type` - Filter by type ("income" or "expense")
- `limit` - Limit number of results (default: 50)
- `sort` - Sort field (default: "-date" for newest first)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/personal_finance_tracker
NODE_ENV=development
```

3. Start MongoDB service

4. Run the development server:
```bash
npm run dev
```

5. Seed the database with sample data:
```bash
node seed.js
```

## Database Schema

### Transaction Model
```javascript
{
  title: String (required),
  amount: Number (required, min: 0),
  category: String (required, enum),
  type: String (required, enum: 'income' | 'expense'),
  date: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

## Categories
- Salary, Freelance, Investment (Income)
- Food, Transportation, Entertainment, Bills, Shopping, Healthcare, Education, Other (Expenses)

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- Error handling middleware 