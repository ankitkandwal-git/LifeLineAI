import axios from 'axios';

const API = "http://localhost:5000/api"; // Replace with your backend API URL" 

export const fetchNearbyHospitals = async(latitude,longitude)=>{
    const response = await axios.get(`${API}/hospitals`,{
        params:{
            latitude,
            longitude
        }
    });
    return response.data;
}