import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/auth/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMessage(res.data.message))
      .catch(() => alert('Unauthorized'));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
