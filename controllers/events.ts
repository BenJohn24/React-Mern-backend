import { Request, Response } from "express";
import Evento from '../models/Evento';
import { CustomRequest } from "../interfaces/CustomRequest";
import { ObjectId } from "mongoose";

export const getEventos = async(req: Request, res: Response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.status(201).json({
        ok: true,
        eventos
    });
}
export const crearEvento = async(req: CustomRequest, res: Response) => {

    const evento = new Evento( req.body );
    try{
      evento.user = req.uid!;
      const eventoGuardado = await evento.save();

      res.json({
        ok: true,
        evento: eventoGuardado
      })
    }
    catch( error ){
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: error,
            txt:'s'

        })
    }
 
}
export const actualizarEvento = async(req: CustomRequest, res: Response) => {
    const eventoId = req.params.id;

    try{
        const evento = await Evento.findById( eventoId );
        const uid = req.uid;

        if( !evento ){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( evento?.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        })
    }
    catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const eliminarEvento = async(req: CustomRequest, res:Response) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById( eventoId );
        const uid = req.uid;


        if( !evento ){
            res.status(404).json({
                ok: false,
                msg: 'El evento no existe con ese id'
            })
        }

        if( evento?.user.toString() !== uid ){
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar el evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        })
    }
    catch ( error ){
        res.status(500).json({
            ok: false,
            msg: 'Habla con el administrador'
        })
    }
    res.json({
        ok: true,
        msg:'eliminar evento'
    })
}

// module.exports = {
//     getEventos,
//     crearEvento,
//     actualizarEvento,
//     eliminarEvento
// }