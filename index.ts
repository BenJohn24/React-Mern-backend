// export const express = require('express');
import express from "express";
import dotenv from 'dotenv'
// require('dotenv').config();
dotenv.config();
// const { dbConnection } = require('./database/config');
import  dbConnection  from './database/config';
import cors from 'cors';
import authRoutes from './routes/auth';
import eventRoutes from './routes/events';

// const cors = require('cors');


// Crear el servidor de express
const app = express();

// Base de datos

 dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public'));

// Lectura y parseo del body
app.use( express.json() );
// Rutas

app.use('/api/auth', authRoutes );
// TODO: CRUD: Eventos
 app.use('/api/events', eventRoutes );



// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})

