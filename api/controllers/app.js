"use strcit";
export function getHome(req,res,next){
    try {
        return res.status(200).json({
            ok:true,
            message: "Peticion realizada correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            error: "Ha ocurrido un error."
        })
    }
}