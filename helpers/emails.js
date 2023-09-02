import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";

dotenv.config();
export const emailRegistro = async (datos) => {
  const { name, email, token } = datos;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    from: '"UpTask administrador de proyectos" <jack.kilian0196@gmail.com>',
    to: email,
    subject: "UpTask - confirma tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `
            <p>Hola ${name},</p>
            <p>Tu cuenta en UpTask está casi lista. Por favor, confírmala haciendo clic en el siguiente enlace:</p>
            <a href="${process.env.FRONTEN_URL}/confirmar/${token}">Comprobar cuenta</a>
            <p>Si no has creado esta cuenta, puedes ignorar este mensaje.</p>
          `,
  };
  sgMail
    .send(message)
    .then((response) => console.log("Mail send...!:", info.response))
    .catch((error) => console.log(error.message));

  // const transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "f446652bfd1ae1",
  //     pass: "3f9b852a61aedb",
  //   },
  // });

  //   const info = await transport.sendMail({
  //     to: email,
  //     from: '"UpTask administrador de proyectos" <jack.kilian0196@gmail.com>',
  //     subject: "UpTask - confirma tu cuenta",
  //     text: "Comprueba tu cuenta en UpTask",
  //     html: `
  //     <p>Hola: ${name} Compueba tu cuenta en UpTask</p>
  //     <p>tu cuenta ya esta  casi lista, comprobarla en el siguienta enlace:
  //     <a href="${process.env.FRONTEN_URL}/confirmar/${token}" >Comprobar cuneta</a>
  //     </p>

  //     <p>Si tu no eres quien esta creando esta cuenta ignora este mensaje</p>
  //     `,
  //   });
  // };
};

export const emailOlvidePassword = async (datos) => {
  const { name, email, token } = datos;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    from: '"UpTask administrador de proyectos" <jack.kilian0196@gmail.com>',
    to: email,
    subject: "UpTask - Reestablece tu contraseña",
    text: "Reestablece tu contraseña",
    html: `
            <p style="text-transform: lowercase; font-family: 'Lucida Sans', sans-serif;">Hola ${name}, has solicitado reestablecer tu contraseña</p>
            <p style="text-transform: lowercase; font-family: 'Lucida Sans', sans-serif;">Sigue el siguiente enlace para generar una nueva contraseña:</p>
            <a style="text-transform: lowercase; font-family: 'Lucida Sans', sans-serif;" href="${process.env.FRONTEN_URL}/olvide-password/${token}">Reestablecer contraseña</a>
            <p style="text-transform: lowercase; font-family: 'Lucida Sans', sans-serif;" >Si no has solicitado este email, puedes ignorar este mensaje.</p>
          `,
  };
  sgMail
    .send(message)
    .then((response) => console.log("Mail send...!:", info.response))
    .catch((error) => console.log(error.message));
};
