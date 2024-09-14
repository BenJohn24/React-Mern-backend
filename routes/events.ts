// const router = require('express').Router();
import { Router } from 'express';
// const { validarJWT } = require('../middlewares/validar-jwt');
import  validarJWT  from '../middlewares/validar-jwt';
// const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
import { getEventos, crearEvento, actualizarEvento, eliminarEvento } from '../controllers/events';
// const { check } = require('express-validator');
import { check } from 'express-validator';
// const { validarCampos } = require('../middlewares/validar-campos');
import  validarCampos from '../middlewares/validar-campos';
// const { isDate } = require('../helpers/isDate');
import { isDate } from '../helpers/isDate';


const router = Router();

// Todas tienen que pasar por la validación del JWT
// Obtener eventos
router.use(validarJWT);

router.get('/', getEventos);

// Crear un Evento
router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Actualizar Evento
router.put('/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento)

// module.exports = router;
export default router; 
