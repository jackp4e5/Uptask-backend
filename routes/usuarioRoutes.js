import express from "express";
import {
  autenticar,
  comprobarToken,
  confirmar,
  nuevoPassword,
  olvidePassword,
  registrar,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const usuarioRouter = express.Router();
//  Creacion confirmacion y registro

usuarioRouter.post("/", registrar);
usuarioRouter.post("/login", autenticar);
usuarioRouter.get("/confirmar/:token", confirmar);
usuarioRouter.post("/recuperar-password", olvidePassword);
// usuarioRouter.get("/recuperar-password/:token", comprobarToken);
// usuarioRouter.post("/recuperar-password/:token", nuevoPassword);
usuarioRouter
  .route("/recuperar-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);

usuarioRouter.get("/perfil", checkAuth, perfil);
export default usuarioRouter;
