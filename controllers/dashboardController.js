import { check, validationResult } from "express-validator";
import User from "../models/User.js";

const dashboard = async (req, res) => {
    const success = req.query.success;
    res.render("app/dashboard", {
        title: "Dashboard",
        csrfToken: req.csrfToken(),
        user: req.user,
        success,
    });
};

const updateUser = async (req, res) => {
    const { name, surname, username, email } = req.body;

    await check("name", "Nombre es requerido").notEmpty().run(req);
    await check("surname", "Apellido es requerido").notEmpty().run(req);
    await check("username", "Nombre de usuario es requerido")
        .notEmpty()
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("app/dashboard", {
            title: "Dashboard",
            csrfToken: req.csrfToken(),
            user: req.user,
            errors: errors.array(),
        });
    }

    const user = await User.findOne({
        where: { email: req.user.email },
    });

    user.name = name;
    user.surname = surname;
    user.username = username;

    await user.save();

    res.redirect(
        "/dashboard?success=Los datos se han actualizado correctamente."
    );
};

export { dashboard, updateUser };
