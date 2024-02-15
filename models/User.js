import Sequelize, { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

export default User;
