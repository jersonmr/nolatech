import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies._token;

    if (!token) {
        // Token does not exist, redirect to the login page
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.APP_KEY);

        const user = await User.scope("removePassword").findOne({
            where: { email: decoded.email },
        });

        if (!user) {
            return res.redirect("/");
        }

        req.user = user;

        return next();
    } catch (error) {
        res.clearCookie("_token").redirect("/");
    }
};

export default authMiddleware;
