import { Router } from "express";
import { getHome } from "../controllers/app";
import { createUser } from "../controllers/users";
const router = Router();

//Ruta default
router.get("/", getHome);

//Rutas de usuario
router.post("/createUser", createUser);

export default router;