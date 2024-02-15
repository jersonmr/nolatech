import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerEmail } from "../helpers/emails.js";

const loginForm = (req, res) => {
    const success = req.query.success;
    const error = req.query.error;
    res.render("auth/login", { title: "Login", success, error });
};

const registerForm = (req, res) => {
    res.render("auth/register", {
        title: "Register",
        csrfToken: req.csrfToken(),
    });
};

const register = async (req, res) => {
    // Receiving form data
    const { name, surname, username, email, password, password_confirmation } =
        req.body;

    // Validate the form data
    await check("name", "Nombre es requerido").notEmpty().run(req);
    await check("surname", "Apellido es requerido").notEmpty().run(req);
    await check("username", "Nombre de usuario es requerido")
        .notEmpty()
        .run(req);
    // check username is unique
    await check("username", "Nombre de usuario ya existe")
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                return Promise.reject();
            }
        })
        .run(req);
    await check("email", "Email es requerido").notEmpty().run(req);
    await check("email", "Email no es válido").isEmail().run(req);
    // check email is unique
    await check("email", "Email ya existe")
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                return Promise.reject();
            }
        })
        .run(req);
    await check("password", "Contraseña es requerida").notEmpty().run(req);
    await check("password", "Contraseña debe tener al menos 6 caracteres")
        .isLength({
            min: 6,
        })
        .run(req);
    await check(
        "password_confirmation",
        "Confirmación de contraseña es requerida"
    )
        .notEmpty()
        .run(req);

    // check password confirmation field is equal to password field
    await check("password_confirmation", "Las contraseñas no coinciden")
        .custom((value, { req }) => value === req.body.password)
        .run(req);

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("auth/register", {
            title: "Register",
            csrfToken: req.csrfToken(),
            errors: errors.array(),
            user: {
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                email: req.body.email,
            },
        });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a token
    const token = jwt.sign({ email }, process.env.TOKEN, {
        expiresIn: "1h",
    });

    // Create a new user
    const newUser = await User.create({
        name,
        surname,
        username,
        email,
        password: hashedPassword,
        token,
    });

    // Send an email to the user
    await registerEmail({
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        token: newUser.token,
    });

    // Redirect to the login page
    res.redirect(
        "/?success=¡Te has registrado correctamente! Por favor valida tu email."
    );
};

// Check account verification
const confirmAccount = async (req, res, next) => {
    const token = 123; //req.params.token;

    // Check if is a valid token
    const user = await User.findOne({ where: { token } });

    if (!user) {
        return res.redirect("/?error=El token no es válido");
    }

    // Update the user
    user.emailVerifiedAt = new Date();
    user.token = null;
    await user.save();

    // Redirect to the login page
    res.redirect(
        "/?success=¡Tu cuenta ha sido verificada! Por favor inicia sesión."
    );

    next();
};

export { loginForm, registerForm, register, confirmAccount };
