import React, { useState } from 'react';

export function Budgeting() {
  const [budgets, setBudgets] = useState<{ category: string; amount: number }[]>([]);

  const handleAddBudget = (category: string, amount: number) => {
    setBudgets([...budgets, { category, amount }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Budgeting</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Set Budget</h2>
        {/* Add form to set budget */}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Current Budgets</h2>
        <ul>
          {budgets.map((budget, index) => (
            <li key={index}>{budget.category}: ${budget.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 