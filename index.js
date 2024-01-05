import express from "express";
import conectardb from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/usuarioRoutes.js";
import proyectoRoute from "./routes/proyectoRoutes.js";
import tareaRouter from "./routes/tareaRoutes.js";

import cors from "cors";

const app = express();

app.use(express.json()); // esto es para poder leer la informacion en viada tipo post

dotenv.config();

conectardb();

// conffigurar cors

const whitelist = [process.env.FRONTEN_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //  puede consultar  la api
      callback(null, true);
    } else {
      // no puede consultar la api

      callback(new Error("Error de cors"));
    }
  },
};
app.use(cors(corsOptions));
// Routing

app.use("/api/usuarios", router);
app.use("/api/proyectos", proyectoRoute);
app.use("/api/tareas", tareaRouter);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`SERVIDOR EN EL PUERTO ${PORT}`);
});

//  socket.io
import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEN_URL
  },
});

io.on("connection", (socket) => {
  console.log("conectado asocket.io");

  //  defir los eventos de socket io

  socket.on("abrir proyecto", proyecto => {
    socket.join(proyecto);
  });

  socket.on("nueva tarea", (tarea) => {
    const proyecto = tarea.proyecto
    socket.to(proyecto).emit("tarea agregada", tarea);
  });

  socket.on("actualizar tarea", tarea => {
    const proyecto = tarea.proyecto._id
    socket.to(proyecto).emit('tarea actualizada', tarea)
  })

  socket.on("eliminar tarea", tarea => {
    const proyecto = tarea.proyecto
    socket.to(proyecto).emit('tarea eliminada', tarea)
  })

  socket.on('estado tarea', tarea => {
    const proyecto = tarea.proyecto._id
    socket.to(proyecto).emit('nuevo estado', tarea)
  })


});
