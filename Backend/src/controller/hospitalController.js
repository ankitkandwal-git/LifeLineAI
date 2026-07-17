import {fetchNearbyHospitals} from "../services/hospitalService.js";

export const getNearbyHospitals = async(req,res) =>{
    try{
        const { latitude, longitude } = req.query;
        const hospitals = await fetchNearbyHospitals(latitude, longitude);
        res.json(hospitals);
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}