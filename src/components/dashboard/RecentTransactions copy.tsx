import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import type { Transaction } from '../types';
import TransactionForm from './TransactionForm';

interface Props {
  transactions: Transaction[];
  onAddTransaction?: (transaction: Transaction) => void;
}

const RecentTransactions: React.FC<Props> = ({ transactions, onAddTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const handleSubmit = (formData: Omit<Transaction, 'id' | 'status'>) => {
    if (onAddTransaction) {
      const newTransaction: Transaction = {
        ...formData,
        id: Date.now().toString(),
        status: 'completed',
      };
      onAddTransaction(newTransaction);
    }
    setShowForm(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="border-none text-sm text-gray-600 focus:ring-0"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              <Plus className="h-5 w-5" />
              <span>New Transaction</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Description</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Reference</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm">{transaction.reference}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={\px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'income'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }\}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs \${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-medium \${
                      transaction.type === 'income'
                        ? 'text-emerald-600'
                        : 'text-red-600'
                    }`}
                  >
                    ₵{transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default RecentTransactions;