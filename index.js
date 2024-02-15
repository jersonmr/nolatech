import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import appRoutes from "./routes/appRoutes.js";

import db from "./config/db.js";

// Create an Express application
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// CSRF protection
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Database connection
try {
    await db.authenticate();
    db.sync();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

// Enable Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Static files
app.use(express.static("public"));

// Define a port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Define a route
app.use("/", authRoutes);
app.use("/dashboard", appRoutes);
