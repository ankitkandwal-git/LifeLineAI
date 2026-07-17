import { useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  return {
    location,
    loading,
    error,
    getLocation,
  };
};

export default useLocation;