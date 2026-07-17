import {analyzeEmergency} from "../services/geminiServices.js"

const createChat = async (req, res) => {
    const { message } = req.body;
    try{
        console.log("Message:",message);
        const result = await analyzeEmergency(message);
        res.status(200).json(result);
    }
    catch (err) {
    console.error("Controller Error:");
    console.error(err);

    res.status(500).json({
        message: err.message,
    });
}
};

// Export the function
export default {
    createChat,
};