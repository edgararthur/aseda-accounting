import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState('');

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await axios.get('/audit/logs');
        setAuditLogs(response.data.message);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchAuditLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <p>{auditLogs}</p>
    </div>
  );
} 