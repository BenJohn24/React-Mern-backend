// const router = require('express').Router();
import { Router } from 'express';
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth';
// const  { crearUsuario, loginUsuario, revalidarToken }  = require('../controllers/auth');
import { check } from 'express-validator';
// const { check } = require('express-validator');
import validarCampos from '../middlewares/validar-campos';
// const { validarCampos } = require('../middlewares/validar-campos');
import validarJWT from '../middlewares/validar-jwt';
import { CustomRequest } from '../interfaces/CustomRequest';
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',
    [ // middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de  ser de 6 caracteres').isLength({ min: 6 })
        ,validarCampos


    ],
    crearUsuario);

router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
        ,validarCampos
    ], 
    loginUsuario);
    // 
router.get('/renew', validarJWT , revalidarToken);

export default router;
// module.exports = router;