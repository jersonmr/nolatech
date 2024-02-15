import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const registerEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const { name, surname, email, token } = data;

    await transporter.sendMail({
        from: "Nolatech",
        to: email,
        subject: "Verifica tu cuenta",
        text: "Por favor, haz click en el siguiente enlace para validar tu cuenta:",
        html: `
            <h1>Hola ${name} ${surname}</h1>
            <p>Por favor, haz click en el siguiente enlace para validar tu cuenta:</p>
            <a href="${process.env.APP_URL}:${
            process.env.APP_PORT ?? 3000
        }/auth/confirm/${token}">Confirmar cuenta</a>
            <p>Si no has creado una cuenta con nosotros, por favor ignora este email.</p>
        `,
    });
};

export { registerEmail };
