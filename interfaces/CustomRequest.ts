import  { Request } from 'express';


export interface CustomRequest extends Request {
    uid?: string;
    name?: string;
}