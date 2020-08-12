import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import db from '../database/connection'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import dotenv from 'dotenv'
import mailer from '../utils/mailer';
dotenv.config()

export default class UsersController{
    async index(req: Request, res: Response){

        const users = await db('users')
            .select('id', 'name');
        
        return res.status(201).json(users);
    }

    async confirmation(req: Request, res: Response){
        const { email, token } = req.query;

        try{
            if( !email || !token ){
                return res.status(400).json( { error: "Falha ao verificar o endereço de e-mail" } );
            }

            //verifica se o email ja esta cadastrado
            const users = await db('users')
                .where({
                    email,
                    confirmation_token: token
                })
                .select('id');

            if( users.length === 0 )
                return res.status(400).json( { error: "Falha ao verificar o endereço de e-mail" } );

            await db("users").where({
                id: users[0].id
            }).update({
                confirmation_token: ""
            })
            
            return res.status(201).json( { message: "E-mail validado com sucesso!"} );

        }catch(err){
            return res.status(400).json( { error: "Falha ao verificar o endereço de e-mail" } );
        }
    }

    async register(req: Request, res: Response){
        const { email, name, pwd } = req.body;

        const trx = await db.transaction();

        try{
            if( !email || !name || !pwd ){
                return res.status(400).json( { error: "Informe todos os dados" } );
            }

            //verifica se o email ja esta cadastrado
            const users = await db('users')
                .where("email", "=", email)
                .select('id');
            
            if( users.length > 0 )
                return res.status(400).json( { error: "Usuário já cadastrado" } );

            const crypted_pwd = await bcrypt.hash( pwd, 8);

            const confirmation_token = crypto.randomBytes(20).toString('hex');

            const insertedUserId = await trx('users').insert({
                email,
                pwd: crypted_pwd,
                name,
                login_type: 1,
                confirmation_token
            });

            await trx.commit();

            //envia email com o token de ativacao
            mailer.sendMail({
                to: email,
                from: 'no-reply@blessed.app.br',
                subject: "[BlessedApp]Verificação de e-mail",
                template: 'auth/register',
                context: {
                    username: name, 
                    email,
                    token: confirmation_token
                }
            }, (err:any) => {
                if(err){
                    console.log(err);
                    return res.status(401).json({  erro: "Não foi possível enviar o e-mail de verificação" });
                }
                 
                return res.status(201).json({user_id: insertedUserId});
            });

            

        }catch(err){
            trx.rollback();

            return res.status(400).json( { error: "Falha ao registrar o novo usuário" } );
        }
    }

    async login(req: Request, res: Response){
        const { email, pwd } = req.body;

        try{
            if( !email || !pwd ){
                return res.status(400).json( { error: "Informe o usuário e senha" } );
            }

            //verifica se o email esta cadastrado
            const user = await db('users')
                .where({
                    email
                })
                .select('id', 'name', 'pwd', 'confirmation_token');
            
            if( user.length === 0 )
                return res.status(400).json( { error: "Usuário não cadastrado" } );

            if( user[0].confirmation_token !== "" )
                return res.status(400).json( { error: "E-mail não confirmado" } );

            if( !( await bcrypt.compare(pwd, user[0].pwd) ) )
                return res.status(400).json( { error: "Senha incorreta" } );

            const secret: string = process.env.SECRET as string;

            return res.status(201).json({
                user_id: user[0].id,
                user_name: user[0].name,
                token: jwt.sign( { id: user[0].id }, secret, {
                    //expiresIn: 86400 //token valido por 1 dia (86400 s)
                })
            });

        }catch(err){
            return res.status(400).json( { error: "Falha ao tentar registrar o login do usuário" } );
        }
    }

    async forgot_password(req: Request, res: Response){
        const { email } = req.body;

        try{
            if( !email ){
                return res.status(400).json( { error: "Informe o email" } );
            }

            //verifica se o email esta cadastrado
            const user = await db('users')
                .where({
                    email
                })
                .select('id', 'name');

            if( user.length === 0 )
                return res.status(400).json( { error: "E-mail não cadastrado" } );


            const {id, name} = user[0];
            const resetpwd_token = crypto.randomBytes(20).toString('hex');
            const resetpwd_expires = new Date();
            resetpwd_expires.setHours( resetpwd_expires.getHours() + 1 );

            const insertedUserId = await db('users')
                .where({
                    id
                }).update({
                    resetpwd_token,
                    resetpwd_expires
            });

            //envia email com o token de ativacao
            mailer.sendMail({
                to: email,
                from: 'no-reply@blessed.app.br',
                subject: "[BlessedApp]Recuperação de senha",
                template: 'auth/forgot_password',
                context: {
                    username: name, 
                    email,
                    token: resetpwd_token
                }
            }, (err:any) => {
                if(err){
                    console.log(err);
                    return res.status(401).json({  erro: "Não foi possível enviar o e-mail de recuperação" });
                }
                 
                return res.status(201).json({message: "O e-mail de de recuperação de senha foi enviado com sucesso"});
            });

            
        }catch(err){
            return res.status(400).json( { error: "Falha ao tentar recuperar a senha do usuário" } );
        }
    }

    async reset_password(req: Request, res: Response){
        const { email, token, password } = req.body;


        try{
            if( !email ){
                return res.status(400).json( { error: "Informe o email" } );
            }

            //verifica se o email esta cadastrado
            const user = await db('users')
                .where({
                    email
                })
                .select('id', 'name', 'resetpwd_token', 'resetpwd_expires');

            if( user.length === 0 )
                return res.status(400).json( { error: "E-mail não cadastrado" } );


            const {id, name, resetpwd_token, resetpwd_expires} = user[0];

            if( token !== resetpwd_token)
                return res.status(400).json( { error: "Token inválido" } );

            const now = new Date();

            if( now > resetpwd_expires)
                return res.status(400).json( { error: "Token expirado. Solicite um novo e-mail de recuperação de senha." } );


            const crypted_pwd = await bcrypt.hash( password, 8);

            await db('users')
                .where({
                    id
                }).update({
                    pwd: crypted_pwd,
                    resetpwd_token: null,
                    resetpwd_expires: null
            });

            return res.status(201).json({message: "Senha alterada com sucesso"});
            
        }catch(err){
            return res.status(400).json( { error: "Falha ao tentar redefinir a senha do usuário" } );
        }
    }

    async me(req: Request, res: Response){
        
        try{
            const { USERID } = req.body;
            
            const user = await db('users')
                .where({
                    id: USERID
                })
                .select('id', 'name', 'email');
        
            return res.status(201).json(user[0]);
        }catch(err){
            return res.status(400).json({ error: "Não foi possível obter as informações do usuário" });
        }
    }
}