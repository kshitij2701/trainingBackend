import express from "express";
const router = express.Router();
import { createTour, getTours } from "../controllers/tour.js";
import auth from "../middlewares/auth.js";

router.post("/", auth, createTour);
router.get("/", getTours);

export default router;