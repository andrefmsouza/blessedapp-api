import { getFirestore } from 'firebase-admin/firestore';
import { User } from "../models/user.model";

export class UsersRepository {
    private static db = getFirestore();

    static async create(user: User) {
        await this.db.collection('users').doc(user.id as string).set({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }

    static async findById(id: string) {
        const snapshot = await this.db.collection('users').doc(id).get();
        return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
    }
}
