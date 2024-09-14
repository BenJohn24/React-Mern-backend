// const jwt = require('jsonwebtoken');
// import { Jwt }  from 'jsonwebtoken';
// import jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/IJwtPalyload';

export const generarJWT = (uid: string, name: string) => {
    return new Promise((resolve, reject) => {

        const payload: IJwtPayload = { uid, name };
        const key: string = process.env.SECRET_JWT_SEED!;
        const claims = {
            'sub': payload,
            'exp': 100000000000000
        }

         const token = jwt.sign(claims, key, { algorithm: 'HS256' });
         console.log(token);
        if (token === null || token === undefined || token == "") {
            reject('No se pudo generar el token')
        }
        resolve(token);

    })
}

// jwt.sign(payload, process.env.SECRET_JWT_SEED, {
//     expiresIn: '2h'
// }, (err: any, token:string) => {

//     if( err instanceof Error){
//         console.log( err );
//         reject('No se pudo generar el token')
//     }
//     resolve( token );
// })

// module.exports = {
//     generarJWT
// }

export default generarJWT
