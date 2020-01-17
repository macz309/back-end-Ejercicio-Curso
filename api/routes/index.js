import { Router } from "express";
import { getHome } from "../controllers/app";
import { createUser, getUsers, updateUser } from "../controllers/users";
import { createPublishment,getPublishments,getAllPublishmentsByUser} from "../controllers/publishment"
import { createComment } from "../controllers/comments";
import { authToken , refreshToken } from "../middlewares/auth-token";
import { login } from "../controllers/login.js";
const router = Router();

//Ruta default
router.get("/", getHome);

//Rutas de usuario
router.post("/createUser", createUser);
router.get("/getUsers",authToken, getUsers);
router.put("/updateUser/:userId", updateUser);

//Rutas de publicacion
router.post("/createPublishment",createPublishment);
router.get("/getPublishments",getPublishments);
router.get("/getAllPublishmentsByUser/:userId",getAllPublishmentsByUser);

//CRUD comment
router.post("/createComment",createComment)

//LOGIN
router.post("/login",login);

export default router;