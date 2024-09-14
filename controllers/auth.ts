import express, { Request, Response } from 'express';
import bycrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import { CustomRequest } from '../interfaces/CustomRequest';
import { generarJWT }  from '../helpers/jwt';

export const crearUsuario = async (req: Request, res: Response) => {

    const { name, email, password } =  req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
         usuario = new Usuario(req.body);

         // Encriptar contraseña 
         const salt = bycrypt.genSaltSync();
         usuario.password = bycrypt.hashSync( password, salt );

         await usuario.save();

         // Generar JWT
         const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

export const loginUsuario = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try{
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email.'
            })
        }

        //Confirmar los passwords
        const validPassword = bycrypt.compareSync( password, usuario!.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecta'
            })
        }
        const token = await generarJWT( usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario!.id,
            name: usuario!.name,
            token
        });

    }catch( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
   
}

export const revalidarToken = async (req: CustomRequest, res: Response) => {

    const uid =  req.uid!;
    const name = req.name!;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name);


     res.json({
        ok: true,
        token
    });
}

// module.exports = {
//     crearUsuario,
//     loginUsuario,
//     revalidarToken
// }