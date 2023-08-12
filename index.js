import express from "express";
import conectardb from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/usuarioRoutes.js";
import proyectoRoute from "./routes/proyectoRoutes.js";
import tareaRouter from "./routes/tareaRoutes.js";


const app = express();

app.use(express.json()) // esto es para poder leer la informacion en viada tipo post

dotenv.config()

conectardb();

// Routing

app.use('/api/usuarios',router)
app.use('/api/proyectos',proyectoRoute)
app.use('/api/tareas',tareaRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`SERVIDOR EN EL PUERTO ${PORT}`);
})