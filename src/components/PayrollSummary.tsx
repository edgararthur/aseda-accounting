import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function PayrollSummary() {
  const [payrollSummary, setPayrollSummary] = useState('');

  useEffect(() => {
    const fetchPayrollSummary = async () => {
      try {
        const response = await axios.get('/payroll/summary');
        setPayrollSummary(response.data.message);
      } catch (error) {
        console.error('Error fetching payroll summary:', error);
      }
    };

    fetchPayrollSummary();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll Summary</h1>
      <p>{payrollSummary}</p>
    </div>
  );
} 