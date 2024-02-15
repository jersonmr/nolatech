import express from "express";
import csrf from "csurf";

const csrfprotection = csrf({
    cookie: true,
});

import {
    loginForm,
    register,
    registerForm,
    confirmAccount,
} from "../controllers/authController.js";
const router = express.Router();
router.use(csrfprotection);

// Register route
router.get("/register", registerForm);
router.post("/register", register);

// Confirm account route
router.get("/auth/confirm/:token", confirmAccount);

// Login route
router.get("/", loginForm);
router.post("/login", (req, res) => {
    // Handle login logic here
});

// Logout route
router.post("/logout", (req, res) => {
    // Handle logout logic here
});

export default router;
