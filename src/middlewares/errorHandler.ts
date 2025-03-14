import { NextFunction, Request, Response} from 'express'
import { AppError } from '../utils/AppError'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        try {
            return res.status(err.statusCode).json({ status: false, error: JSON.parse(err.message) });
        } catch (error) {
            return res.status(err.statusCode).json({ status: false, error: err.message });
        }
    }

    console.error(err); // Log do erro para depuração
    return res.status(500).json({ status: false, error: "Internal Server Error" });
}