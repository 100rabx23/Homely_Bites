import { useState, useEffect } from 'react';
import { socket } from '../services/socket';

export function useOrderStats() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    delivered: 0,
    customers: 0
  });

  useEffect(() => {
    // Initial stats fetch
    fetchStats();

    // Listen for real-time updates
    socket.on('statsUpdate', (newStats) => {
      setStats(newStats);
    });

    return () => {
      socket.off('statsUpdate');
    };
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  return { stats };
}