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
    creador: {
      type: Types.ObjectId,
      ref: "Usuario", // aqui semeja el modelo de Usuario
    },
    colaboladores: [
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
