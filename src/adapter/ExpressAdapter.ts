import { NextFunction, Request, Response } from 'express';

export default class ExpressAdapter {
    static create(fn: any) {
        return async function (req: Request, res: Response, next: NextFunction) {
            try {
                const obj = await fn({ 
                    params: req.params, 
                    query: req.query, 
                    body: req.body, 
                    locals: res.locals, 
                    headers: req.headers, 
                    nextFunction: next 
                });
                res.status(obj.status).json(obj.json);
            } catch (error) {
                next(error); // Encaminha o erro para o errorHandler
            }
        };
    }
}