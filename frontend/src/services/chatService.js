import axios from 'axios';

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const sendMessage = async(message)=>{
    const response = await axios.post(`${API}/chat`, { message });
    return response.data;
};

