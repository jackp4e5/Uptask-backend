import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarcolaborador,
  eliminarColaborador,
  obtenerTareas,
} from "../controllers/proyectoController.js";

import express from "express";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.get("/tareas/:id", checkAuth, obtenerTareas);
router.post("/agregar-colaborador/:id", checkAuth, agregarcolaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
