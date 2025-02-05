import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AuditTrail() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/audit/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>
      <table className="min-w-full bg-white rounded-lg">
        <thead className='text-gray-700 text-sm'>
          <tr>
            <th className='py-2 px-4 border-b'>Timestamp</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className='text-center text-gray-500 text-sm font-normal'>
              <td className='py-2 px-4 border-b'>{log.timestamp}</td>
              <td className="py-2 px-4 border-b">{log.userId}</td>
              <td className="py-2 px-4 border-b">{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 