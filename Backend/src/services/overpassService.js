import axios from "axios";

export const getNearbyHospitals = async(latitude,longitude) =>{
    const radius = 5000;
    const query = `
    [out:json];(
    node[${radius}](around:${latitude},${longitude});
    way[${radius}](around:${latitude},${longitude});
    relation[${radius}](around:${latitude},${longitude});
    );
    out center;`;

    const response = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,{
            headers:{
                "Content-Type":"text/plain"
            },
        }
    );
    return response.data.elements;
}