import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { dashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", authMiddleware, dashboard);

export default router;
