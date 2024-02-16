import db from "../config/db.js";
import User from "../models/User.js";
import users from "./users.js";

const importData = async () => {
    try {
        // Authenticate to the database
        await db.authenticate();

        // Generate the columns
        await db.sync();

        // Insert the data
        await Promise.all(users.map((user) => User.create(user)));
        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Authenticate to the database
        await db.authenticate();

        // Drop the table
        await Promise.all([User.destroy({ where: {}, truncate: true })]);

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-d") {
    destroyData();
}
