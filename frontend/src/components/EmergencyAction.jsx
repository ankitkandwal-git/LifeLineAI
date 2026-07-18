import React, { useState, useEffect } from "react";
import { PhoneCall, AlertTriangle, MapPin, ExternalLink, Navigation, Hospital } from "lucide-react";
import { callAmbulance } from "../utils/emergency";
import useLocation from "../hooks/useLocation";
import { fetchNearbyHospitals } from "../services/hospitalServices";

// Haversine formula to compute distance in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(1); // Return with one decimal place
};

const EmergencyActions = ({ severity, className }) => {
  const emergencyLevels = ["HIGH", "CRITICAL"];

  const shouldShow =
    severity && emergencyLevels.includes(severity.toUpperCase());

  if (!shouldShow) return null;

  const handleCall = () => {
    const confirmCall = window.confirm(
      "This appears to be a serious medical emergency.\n\nDo you want to call Ambulance (108)?"
    );

    if (confirmCall) {
      callAmbulance();
    }
  };

  const { location, loading: locationLoading, error: locationError, getLocation } = useLocation();
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [hospitalsError, setHospitalsError] = useState("");

  useEffect(() => {
    const getHospitals = async () => {
      if (location) {
        setLoadingHospitals(true);
        setHospitalsError("");
        try {
          console.log("Fetching hospitals for coordinates:", location.latitude, location.longitude);
          const data = await fetchNearbyHospitals(location.latitude, location.longitude);
          console.log("Hospitals received:", data);
          setHospitals(data || []);
        } catch (err) {
          console.error("Error fetching hospitals:", err);
          setHospitalsError("Failed to fetch nearby hospitals.");
        } finally {
          setLoadingHospitals(false);
        }
      }
    };
    getHospitals();
  }, [location]);

  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      {/* Ambulance Dispatch Card */}
      <div className="p-5 border border-red-200/50 shadow-md rounded-2xl bg-red-50/50 dark:bg-red-950/10 dark:border-red-950/30 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-600 animate-pulse" size={20} />
          <h2 className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wider">
            Immediate Response
          </h2>
        </div>

        <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-medium">
          A severe emergency has been identified. If the victim has severe chest discomfort, breathing failure, or unconsciousness, initiate immediate dispatch.
        </p>

        <button
          onClick={handleCall}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 text-sm font-bold text-white transition-all duration-300 bg-gradient-to-r from-red-700 to-red-600 rounded-xl hover:from-red-800 hover:to-red-700 shadow-lg shadow-red-500/20 active:scale-98 animate-pulse"
        >
          <PhoneCall size={16} />
          Call Ambulance (108)
        </button>
      </div>

      {/* Geolocation & Nearby Infrastructure Card */}
      <div className="p-5 border border-slate-200/50 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <MapPin className="text-blue-500" size={18} />
          <h2 className="text-sm font-bold text-slate-850 dark:text-slate-200">
            Medical Infrastructure
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
          Retrieve GPS coordinates to list nearby hospitals and emergency rooms within 5km of your location.
        </p>

        <button
          onClick={getLocation}
          disabled={locationLoading || loadingHospitals}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-650 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition active:scale-98"
        >
          {locationLoading ? "Retrieving GPS..." : loadingHospitals ? "Fetching Infrastructure..." : "Find Nearby Hospitals"}
        </button>

        {/* Loading & Error States */}
        {(locationLoading || loadingHospitals) && (
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold animate-pulse flex items-center gap-1.5 justify-center mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping"></span>
            {locationLoading ? "Awaiting geolocation authorization..." : "Scanning OpenStreetMap database..."}
          </p>
        )}

        {(locationError || hospitalsError) && (
          <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 justify-center mt-1">
            ⚠️ {locationError || hospitalsError}
          </p>
        )}

        {/* Premium Hospital Cards */}
        {hospitals.length > 0 && (
          <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-3">
            <h3 className="text-xs font-black text-slate-850 dark:text-slate-200 uppercase tracking-wider">
              Closest Facilities:
            </h3>
            
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
              {hospitals.map((hospital) => {
                const name = hospital.tags?.name || "Unnamed Emergency Room";
                const address = hospital.address || "Address not available";
                
                // Extract coordinates for distance calculation and navigation
                const hLat = hospital.lat || hospital.center?.lat;
                const hLon = hospital.lon || hospital.center?.lon;
                
                const distance = location
                  ? calculateDistance(location.latitude, location.longitude, hLat, hLon)
                  : null;
                
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  name
                )}&query=${hLat},${hLon}`;

                return (
                  <div
                    key={hospital.id}
                    className="p-4 bg-slate-50/50 dark:bg-slate-850/40 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col gap-2 transition hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-850"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-500 flex items-center justify-center flex-shrink-0">
                          <Hospital size={13} />
                        </div>
                        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-150 leading-tight">
                          {name}
                        </h4>
                      </div>
                      
                      {distance && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100/50 dark:bg-blue-950/45 dark:text-blue-400 dark:border-blue-900/30 flex-shrink-0">
                          <Navigation size={9} className="rotate-45" />
                          {distance} km
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-450 font-medium">
                      {address}
                    </p>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-[10px] font-bold text-slate-700 hover:text-blue-600 dark:text-slate-350 dark:hover:text-blue-400 transition hover:bg-slate-50 dark:hover:bg-slate-850 text-center"
                    >
                      Open in Google Maps
                      <ExternalLink size={10} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyActions;