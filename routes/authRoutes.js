import express from "express";

import {
    loginForm,
    register,
    registerForm,
    confirmAccount,
    login,
    logout,
} from "../controllers/authController.js";
const router = express.Router();

// Register route
router.get("/register", registerForm);
router.post("/register", register);

// Confirm account route
router.get("/auth/confirm/:token", confirmAccount);

// Login route
router.get("/", loginForm);
router.post("/login", login);

// Logout route
router.post("/logout", logout);

export default router;
