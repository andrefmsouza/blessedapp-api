import { getFirestore } from 'firebase-admin/firestore';
import { Outline, OutlineModel } from "../models/outline.model";

export class OutlinesRepository {
    private static db = getFirestore();

    static async create(outline: Outline) {
        const docRef = this.db
            .collection('users')
            .doc(outline.userId)
            .collection('outlines')
            .doc();

        const newOutline = {
            id: docRef.id,
            userId: outline.userId,
            title: outline.title,
            introduction: outline.introduction,
            development: outline.development,
            conclusion: outline.conclusion,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        await docRef.set(newOutline);
        return newOutline;
    }

    static async findById(userId: string, id: string) {
        const snapshot = await this.db
            .collection('users')
            .doc(userId)
            .collection('outlines')
            .doc(id)
            .get();

        return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
    }

    static async findByUserId(userId: string) {
        try {
            const snapshot = await this.db
                .collection('users')
                .doc(userId)
                .collection('outlines')
                .get();
                
            return snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title
            }));
        } catch (error) {
            console.log("Erro ao buscar esboços:", error);
            return [];
        }
    }

    static async update(userId: string, id: string, outline: Partial<Outline>) {
        const docRef = this.db
            .collection('users')
            .doc(userId)
            .collection('outlines')
            .doc(id);

        await docRef.update({
            ...outline,
            updatedAt: new Date()
        });
        
        const snapshot = await docRef.get();
        return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
    }

    static async delete(userId: string, id: string) {
        await this.db
            .collection('users')
            .doc(userId)
            .collection('outlines')
            .doc(id)
            .delete();
    }
} 