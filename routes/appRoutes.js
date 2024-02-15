import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { dashboard, updateUser } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", authMiddleware, dashboard);

router.post("/update-user", authMiddleware, updateUser);

export default router;
