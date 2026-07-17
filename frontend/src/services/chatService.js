import axios from 'axios';

const API = "http://localhost:5000/api"; // Replace with your backend API URL

export const sendMessage = async(message)=>{
    const response = await axios.post(`${API}/chat`, { message });
    return response.data;
};

