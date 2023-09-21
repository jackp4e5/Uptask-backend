import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({
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

  estado:{
    type:Boolean,
    default:false
  },

  fechaEntrega:{
    type:Date,
    dafault:Date.now()
  },

  prioridad:{
    type:String,
    required:true,
    enum:["Baja","Media","Alta"],
  },
  
  proyecto:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Proyecto" // este asemeja el modelo de proyecto
  }
},{
    timestamps:true
});

const Tarea = mongoose.model("Tarea",tareaSchema)

export default Tarea