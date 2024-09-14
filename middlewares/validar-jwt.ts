import express, { Request, Response, NextFunction, RequestHandler } from 'express';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/CustomRequest';
import { IJwtPayload } from '../interfaces/IJwtPalyload';
import e from 'express';


const validarJWT = ( req: CustomRequest, res: Response, next: NextFunction ) => {
    // x-token headers
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{
        const privateKey: string = process.env.SECRET_JWT_SEED!;
        let jwtVerify = jwt.verify(
            token,
            privateKey
        );

        if(typeof jwtVerify === 'object' && jwtVerify !== null && 'uid' in jwtVerify && 'name' in jwtVerify){
            jwtVerify as IJwtPayload
            req.uid = jwtVerify.uid;
            req.name = jwtVerify.name;

        }

        console.log(jwtVerify)


    }catch( error ){
        if( error instanceof Error){
            console.log(error.message)
            return res.status(401).json({
                ok:false,
                msg: 'Token no válido',
                err: error.message
            })
        }
       
    }
    
    next();
} 

// module.exports = {
//     validarJWT
// }

export default validarJWT;