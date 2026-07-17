import express from "express";
import {getNearbyHospitals} from "../controller/hospitalController.js";

const router = express.Router();

router.get("/hospitals", getNearbyHospitals);

export default router;