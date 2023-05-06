import express from "express";
import { loginEmployee } from "../controllers/general.js";

const router = express.Router();

router.post("/login", loginEmployee);

export default router;