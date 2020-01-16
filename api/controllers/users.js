import {User} from "../models/user";
import bcrypt from "bcryptjs";

//CREAR USUARIOS
export function createUser(req,res){
    try {
        const {name, userName, email, password} =req.body
        const newUser = new User({
            userName: userName,
            name : name,
            email : email,
            password : bcrypt.hashSync(password,10)
        })
        newUser.save((err,userSave)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: "Error al crear usuario",
                    errors: err
                })
            }else{
                res.status(201).json({
                    ok: true,
                    user: userSave
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "Hay problemas en nuestro servidor."
        })
    }
}

//OBTENER USUARIOS
export async function getUsers(req, res){
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(400).json({
                ok: false,
                message: "No se encontraron usuarios"
            })
        }else{
            return res.status(200).json({
                ok: true,
                message: "Se regresaron los usuarios correctamente",
                users: users
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: "Hay errores internos",
            status: false
        })
    }
}

//ACTUALIZAR USUARIOS
export async function updateUser(req,res) {
    try {
        const { userId } = req.params;
        const { name, email, userName, description } = req.body;
        const user = await User.findById(userId);
        user.name = name;
        user.userName = userName;
        user.email = email;
        user.description = description;
        const userUpdated = await user.save();
        if (!userUpdated){
            return res.status(400).json({
                ok: false,
                mesagge: "El usuario no pudo ser guardado"
            })
        }else{
            return res.status(200).json({
                ok: true,
                mesagge: "Usuario actualizado"
            })
        }
    } catch (error) {
        
    }
}