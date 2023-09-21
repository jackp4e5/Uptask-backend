import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";
// dotenv.config();

export const emailRegistro = async (datos) => {
  const { name, email, token } = datos;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    from: '"UpTask administrador de proyectos" <jack.kilian0196@gmail.com>',
    to: email,
    subject: "UpTask - confirma tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `
    <div style=" text-align:center; color: rgb(5, 9, 24); font-family: cursive, sans-serif">
    <h1
      style="
        font-size: 20px;
        font-weight: 700;
        color: rgb(4, 43, 70);
        text-align: center;
      "
    >
      UpTask
    </h1>

    <p>
      Hola<span style="font-weight: 700">${name}</span>, tu cuenta en UpTask
      está casi lista. Por favor, confírmala haciendo clic en el siguiente
      enlace:
    </p>
    <a
      style="font-weight: 700; color: rgb(4, 43, 70)"
      href="${process.env.FRONTEN_URL}/confirmar/${token}"
      >Comprobar cuenta</a
    >
    <p>Si no has creado esta cuenta, puedes ignorar este mensaje.</p>
  </div>
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
    <div style=" text-align:center; color: rgb(5, 9, 24); font-family: cursive, sans-serif">
    <h1 style="font-size: 20px; font-weight: 700; color: rgb(4, 43, 70); text-align: center;" >UpTask</h1>
    <p>
      Hola <span style="font-weight: 700">${name}</span>, has solicitado
      reestablecer tu contraseña
    </p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña:</p>
    <a
      style="font-weight: 700; color: rgb(4, 43, 70)"
      href="${process.env.FRONTEN_URL}/olvide-password/${token}"
      >Reestablecer contraseña</a
    >
    <p>Si no has solicitado este email, puedes ignorar este mensaje.</p>
  </div>
          `,
  };
  sgMail
    .send(message)
    .then((response) => console.log("Mail send...!:", info.response))
    .catch((error) => console.log(error.message));
};
