import mongoose, { Types } from "mongoose";

const proyectosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },

    descripcion: {
      type: String,
      trim: true,
      required: true,
    },

    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },

    cliente: {
      type: String,
      trim: true,
      required: true,
    },

    tareas: [
      {
        type: Types.ObjectId,
        ref: "Tarea", // Hace referencia al modelo de tarea
      },
    ],

    creador: {
      type: Types.ObjectId,
      ref: "Usuario", // hace referencia al modelo de Usuario
    },

    colaboradores: [
      {
        type: Types.ObjectId,
        ref: "Usuario", // aqui semeja el modelo de Usuario
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Proyecto = mongoose.model("Proyecto", proyectosSchema);

export default Proyecto;
