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
  fechaEntraga:{
    type:Date,
    required:true,
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
    timeStamps:true
});

const Tarea = mongoose.model("Tarea",tareaSchema)

export default Tarea