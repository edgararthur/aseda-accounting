import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function MultiCurrency() {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('/currency/exchange-rates');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Multi-Currency Support</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Exchange Rates</h2>
        <ul>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <li key={currency}>{currency}: {rate}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 