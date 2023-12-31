import { emailOlvidePassword, emailRegistro } from "../helpers/emails.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  //  Evitar usuarios Duplicados

  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(404).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();
    //  enviar email de confirmación

    emailRegistro({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token,
    });
    res.json({
      msg: "Usuario creado correctamente, llegará una verificación a tu correo",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe ");
    return res.status(404).json({ msg: error.message });
  }

  //    Verificar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada ");
    return res.status(404).json({ msg: error.message });
  }

  //  Comprobar password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta ");
    return res.status(404).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("El token no es valido intenta nuevamente");
    return res.status(403).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe ");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    // enviar email

    emailOlvidePassword({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "El token es valido" });
  } else {
    const error = new Error(
      "El token no es valido intenta nuevamente más tarde"
    );
    return res.status(403).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    await usuario.save();
    res.json({ msg: "La contraseña se actualizó correctamente" });
  } else {
    const error = new Error(
      "El token no es valido intenta nuevamente más tarde"
    );
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
