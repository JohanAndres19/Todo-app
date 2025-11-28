import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config.ts";
import routes from "./scream/routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(Number(config.port),'0.0.0.0' ,() =>
      console.log(`Servidor corriendo en puerto ${config.port}`)
    );
  })
  .catch(err => console.error("Error conectando a MongoDB", err));
