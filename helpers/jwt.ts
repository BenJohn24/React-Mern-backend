const jwt = require('jsonwebtoken');


const generarJWT = ( uid: string, name: string) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err: any, token:string) => {

            if( err instanceof Error){
                console.log( err );
                reject('No se pudo generar el token')
            }
            resolve( token );
        })
    })
}

module.exports = {
    generarJWT
}