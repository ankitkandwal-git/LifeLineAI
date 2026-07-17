import React, { useState, useEffect } from "react";
import { PhoneCall, AlertTriangle } from "lucide-react";
import { callAmbulance } from "../utils/emergency";
import useLocation from "../hooks/useLocation";
import { fetchNearbyHospitals } from "../services/hospitalServices";

const EmergencyActions = ({ severity, className }) => {
  const emergencyLevels = ["HIGH", "CRITICAL"];

  const shouldShow =
    // eslint-disable-next-line react/prop-types
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
    <div className={`p-5 mt-6 border border-red-200 shadow-lg rounded-2xl bg-red-50 ${className}`}>
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-red-600" size={24} />
        <h2 className="text-xl font-bold text-red-700">
          Emergency Actions
        </h2>
      </div>

      <p className="mt-2 text-sm text-gray-700">
        A serious emergency has been detected. If the patient has severe chest
        pain, difficulty breathing, unconsciousness, or any life-threatening
        symptoms, seek immediate medical help.
      </p>

      <button
        onClick={handleCall}
        className="flex items-center justify-center w-full gap-2 px-6 py-4 mt-5 text-lg font-semibold text-white transition-all duration-300 bg-red-600 rounded-xl hover:bg-red-700 hover:shadow-xl active:scale-95"
      >
        <PhoneCall size={22} />
        Call Ambulance (108)
      </button>

      <button
        onClick={getLocation}
        disabled={locationLoading || loadingHospitals}
        className="mt-3 w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 active:scale-95"
      >
        {locationLoading ? "Getting Location..." : loadingHospitals ? "Fetching Hospitals..." : "🏥 Nearby Hospitals"}
      </button>

      {/* Loading & Error States */}
      {(locationLoading || loadingHospitals) && (
        <p className="mt-2 text-xs text-blue-600 animate-pulse">
          {locationLoading ? "Retrieving GPS coordinates..." : "Finding closest hospitals..."}
        </p>
      )}

      {(locationError || hospitalsError) && (
        <p className="mt-2 text-xs text-red-600">
          ⚠️ {locationError || hospitalsError}
        </p>
      )}

      {/* Hospitals List */}
      {hospitals.length > 0 && (
        <div className="mt-4 border-t border-red-200 pt-4">
          <h3 className="text-sm font-bold text-red-800 mb-2">Nearby Hospitals:</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {hospitals.map((hospital) => {
              const name = hospital.tags?.name || "Unnamed Medical Facility";
              // Render the Nominatim reverse-geocoded address returned from the backend
              const address = hospital.address || "Address not available";

              return (
                <div key={hospital.id} className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                  <div className="font-semibold text-sm text-slate-800">{name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{address}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyActions;