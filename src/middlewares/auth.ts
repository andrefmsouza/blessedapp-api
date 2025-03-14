import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebase-admin';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new AppError("No token provided", 401));
    }

    try {
        // Decodifica nosso JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        
        try {
            // Verifica o token do Firebase
            const decodedToken = await adminAuth.verifyIdToken(decoded.idToken);
            
            // Se chegou aqui, o token é válido
            res.locals.userId = decodedToken.uid;
            res.locals.userEmail = decodedToken.email;
            next();
        } catch (error) {
            // Se o token expirou, o usuário precisa fazer login novamente
            return next(new AppError("Token expired", 401));
        }
    } catch (error) {
        console.error("JWT Error:", error);
        return next(new AppError("Unauthorized", 401));
    }
}
