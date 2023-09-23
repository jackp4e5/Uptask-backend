import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    $or: [
      { colaboradores: { $in: req.usuario } },
      { creador: { $in: req.usuario } },
    ],
  }).select("-tareas");
  // esto es para listar las proyectos de un solo usuario
  res.json(proyectos);
};
const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id)
    .populate("tareas")
    .populate("colaboradores", "name  email");
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (
    proyecto.creador.toString() !== req.usuario._id.toString() &&
    proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario.toString())
  ) {
    const error = new Error("Acción No válida");
    return res.status(401).json({ msg: error.message });
  }

  // obtener las tareas del proyecto
  res.json(proyecto);
};
const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error({ msg: "Proyecto no encontrado" });
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error({ msg: "Acción No válida" });
    return res.status(403).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(  "Acción No válida" );
    return res.status(401).json({ msg: error.message});
  }

  try {
    await proyecto.deleteOne();
    res.json({ msg: "Proyecto eliminado " });
  } catch (error) {
    console.log(error.message);
  }
};
const buscarColaborador = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -password -__v -createdAt -token -updatedAt"
  );

  if (!usuario) {
    const error = new Error("Usuario no encontrado");

    return res.status(404).json({ msg: error.message });
  }

  res.json(usuario);
};
const agregarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -password -__v -createdAt -token -updatedAt"
  );

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  //  verifica que la peresona no sea la que creo el proyecto

  if (proyecto.creador.toString() === usuario._id.toString()) {
    const error = new Error(
      "El creador del proyecto no puede ser colaborador "
    );
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.colaboradores.includes(usuario._id)) {
    const error = new Error("El usuario ya Pertenece Al Proyecto");
    return res.status(404).json({ msg: error.message });
  }

  //  agregar colaboradores

  proyecto.colaboradores.push(usuario._id);
  await proyecto.save();
  res.json({ msg: "colaborador Agregado Correctamente" });
};
const eliminarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(404).json({ msg: error.message });
  }

  //  Eliminar colaborador

  proyecto.colaboradores.pull(req.body.id);
  await proyecto.save();
  res.json({ msg: "colaborador Eliminado Correctamente" });
};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador,
};
