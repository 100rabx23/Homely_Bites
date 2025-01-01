import { useState, useEffect } from 'react';
import { socket } from '../services/socket';

export function useLocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          
          // Emit location update if delivering an order
          if (socket.connected) {
            socket.emit('updateLocation', { location: newLocation });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const updateLocation = (newLocation: { lat: number; lng: number }) => {
    setLocation(newLocation);
    socket.emit('updateLocation', { location: newLocation });
  };

  return { location, updateLocation };
}