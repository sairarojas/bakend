import jwt from "jsonwebtoken"
import usuario from "../models/usuario.js";
import "dotenv/config"

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

const validarJWT = async (req, res, next) => {
    /* const token = req.header("x-token"); */
    const {token, correo, contrasena}=req.body
    console.log('token resivido:', token)
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, user) => {
            if (err) {
                return res.status(401).json({
                    msg: "Token no válido"
                });
            }
        });

        const usuarioEncontrado = await usuario.findById(uid);

        if (!usuarioEncontrado) {
            return res.status(401).json({
                msg: "Token no válido"
            });
        }

        if (usuarioEncontrado.estado === 0) {
            return res.status(401).json({
                msg: "usuario inactivo"
            });
        }

        res.json(usuarioEncontrado);
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

export { generarJWT, validarJWT };
