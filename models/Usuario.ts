// const { model, Schema } = require('mongoose');
import { Schema, model, connect } from 'mongoose';

interface IUser {
    name: string,
    email: string,
    password: string
}

const UsuarioSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
export default model<IUser>('Usuario', UsuarioSchema)