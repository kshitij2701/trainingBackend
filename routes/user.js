import express from "express";
const router = express.Router();
import { googleLogIn, signin, signup } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleLogIn", googleLogIn);
export default router;