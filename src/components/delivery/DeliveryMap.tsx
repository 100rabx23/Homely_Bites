import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface DeliveryMapProps {
  deliveryLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

export function DeliveryMap({ deliveryLocation, destination }: DeliveryMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={deliveryLocation || center}
      zoom={13}
    >
      {deliveryLocation && (
        <Marker
          position={deliveryLocation}
          icon={{
            url: '/delivery-icon.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
      )}
      
      {destination && (
        <Marker
          position={destination}
          icon={{
            url: '/destination-icon.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
      )}
    </GoogleMap>
  );
}