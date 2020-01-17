import { verify } from "jsonwebtoken";
import { SEED } from "../config/config"

export async function authToken(req, res, next){
    try{
        let token = req.headers["authorization"];        
        if(!token){
            return res.status(401).json({
                ok: false,
                message: "Falta el token"
            })
        }
        token = token.replace("Bearer ", "");
        
        verify(token, SEED, (err,decoded) =>{
            if(err){
                return res.status(401).json({
                    ok: false,
                    message: "invalid token",
                    error: err
                })
            }
            req.user = decoded.user;
            return next();
        })

    }catch(error){

        return res.status(500).json({
            error:"Hay un problema en el servidor"
        })
    }
}
