import React, {useState, useEffect} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '252px',
};

export function MapComponent({address}) {
  const [location, setLocation] = useState({lat: 0, lng: 0});
  const apiKey = 'AIzaSyBSp1leEHfOF-IOoDaYRcNi9Xr7RgXaSl4';
  //   const apiKey = process.env.GOOGLE_API_KEY;

  useEffect(() => {
    const geocodeAddress = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`,
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const {lat, lng} = data.results[0].geometry.location;
        setLocation({lat, lng});
      }
    };

    geocodeAddress();
  }, [address, apiKey]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}
