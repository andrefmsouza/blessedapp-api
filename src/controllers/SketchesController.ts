import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import db from '../database/connection'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import dotenv from 'dotenv'
import mailer from '../utils/mailer';
dotenv.config()

export default class SketchesController{
    async index(req: Request, res: Response){

        const users = await db('users')
            .select('id', 'name');
        
        return res.status(201).json(users);
    }

    async all(req: Request, res: Response){
        try{
            const { USERID } = req.body;
            
            
            const sketches = await db('sketches')
                .where({
                    user_id: USERID
                })
                .select('*');
        
            return res.status(201).json( sketches );
        }catch(err){
            return res.status(400).json({ });
        }
    }

    async once(req: Request, res: Response){
        try{
            const { USERID } = req.body;
            
            
            const sketches = await db('sketches')
                .where({
                    user_id: USERID
                })
                .select('*');
        
            return res.status(201).json( sketches );
        }catch(err){
            return res.status(400).json({ });
        }
    }
}