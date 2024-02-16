import User from "../../models/User.js";
import bcrypt from "bcrypt";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const { page, count } = req.query;

        // validate the query parameters
        if (!page || !count) {
            console.log("first if");
            const users = await User.scope("removePassword").findAll();

            res.json(users);
        } else {
            const offset = (page - 1) * count;
            console.log(page, count, offset);

            const users = await User.scope("removePassword").findAll({
                limit: parseInt(count),
                offset,
            });

            res.json(users);
        }
    } catch (error) {
        console.log(error);
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    const user = await User.scope("removePassword").findByPk(req.params.id);

    if (!user) {
        res.status(404);
        res.json({ msg: "El usuario no existe" });
        return;
    }

    res.json(user);
};

// Create a new user
const createUser = async (req, res, next) => {
    const { name, surname, username, email, password } = req.body;

    // Validate the required fields
    if (!name || !surname || !username || !email || !password) {
        res.status(422);
        res.json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    // Validate the username is unique
    const userName = await User.findOne({ where: { username } });
    if (userName) {
        res.status(422);
        res.json({ msg: "El nombre de usuario ya existe" });
        return;
    }

    // Validate the email is unique
    const userEmail = await User.findOne({ where: { email } });
    if (userEmail) {
        res.status(422);
        res.json({ msg: "El email ya existe" });
        return;
    }

    // Validate the password
    if (password.length < 6) {
        res.status(422);
        res.json({ msg: "La contraseña debe tener al menos 6 caracteres" });
        return;
    }

    // Hashing the password with bcrypt before saving it
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    const user = new User(req.body);

    try {
        await user.save();

        res.status(201);
        res.json({ msg: "Usuario creado correctamente" });
    } catch (error) {
        console.log(error);
        next();
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    const user = await User.scope("removePassword").findByPk(req.params.id);

    if (!user) {
        res.status(404);
        res.json({ msg: "El usuario no existe" });
        return;
    }

    const { name, surname, username } = req.body;

    // Validate the required fields
    if (!name || !surname || !username) {
        res.status(422);
        res.json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    // Validate the username is unique
    const userName = await User.findOne({ where: { username } });
    if (userName) {
        res.status(422);
        res.json({ msg: "El nombre de usuario ya existe" });
        return;
    }

    user.name = name;
    user.surname = surname;
    user.username = username;

    try {
        await user.save();

        res.json({ msg: "Usuario actualizado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const user = await User.scope("removePassword").findByPk(req.params.id);

    if (!user) {
        res.status(404);
        res.json({ msg: "El usuario no existe" });
        return;
    }

    try {
        await user.destroy();

        res.json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
