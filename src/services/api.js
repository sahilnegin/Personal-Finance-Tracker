const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  async getTransactions(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.type && filters.type !== 'all') params.append('type', filters.type);
    
    const response = await fetch(`${API_BASE_URL}/transactions?${params}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  async getTransaction(id) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch transaction');
    return response.json();
  },

  async createTransaction(transaction) {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },

  async updateTransaction(id, transaction) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return response.json();
  },

  async deleteTransaction(id) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/transactions/stats/summary`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  }
}; 