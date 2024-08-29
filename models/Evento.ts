import { Schema, Types, model } from 'mongoose';

interface IEvento {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: Types.ObjectId | string;
    __v: Number;
    id: string;

}
const EventoSchema = new Schema<IEvento>({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true

    }
});

EventoSchema.method('toJSON', function(){
    const { _id, __v,  ...object } = this.toObject();
    object.id = _id.toString();
    
    return object; 
})

export default model<IEvento>('Evento', EventoSchema);