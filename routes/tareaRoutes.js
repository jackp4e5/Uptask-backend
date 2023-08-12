import express from "express";
import {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
} from "../controllers/tareaControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const tareaRouter = express.Router();

tareaRouter.post("/", agregarTarea);
tareaRouter
  .route("/:id")
  .get(checkAuth, obtenerTarea)
  .put(checkAuth, actualizarTarea)
  .delete(checkAuth, eliminarTarea);

tareaRouter.post("/estado/:id", checkAuth, cambiarEstado);

export default tareaRouter;
