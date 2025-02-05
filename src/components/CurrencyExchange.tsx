import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function CurrencyExchange() {
  const [exchangeRates, setExchangeRates] = useState('');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('/currency/exchange-rates');
        setExchangeRates(response.data.message);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exchange Rates</h1>
      <p>{exchangeRates}</p>
    </div>
  );
} 