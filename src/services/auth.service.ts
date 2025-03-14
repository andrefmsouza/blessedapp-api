import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";
import jwt from 'jsonwebtoken';

export class AuthService {
    static async register(name: string, email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const user = new User(name, email, userId);
            await UsersRepository.create(user);

            return { id: userId, email };
        } catch (error: any) {
            throw new AppError(error.message, 401);
        }
    }

    static async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            const refreshToken = userCredential.user.refreshToken;
            
            // Criar JWT com ambos os tokens
            const token = jwt.sign(
                { 
                    idToken,
                    refreshToken,
                    uid: userCredential.user.uid,
                    email: userCredential.user.email 
                },
                process.env.JWT_SECRET!,
                { expiresIn: '30d' }
            );
            
            return { token };
        } catch (error: any) {
            throw new AppError(error.message, 401);
        }
    }
}
