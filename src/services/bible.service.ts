import fs from 'fs/promises';
import path from 'path';
import { AppError } from '../utils/AppError';

export class BibleService {
    private static dataPath = path.join(__dirname, '../data/bibles');

    static async getVersions() {
        try {
            const files = await fs.readdir(this.dataPath);
            return files
                .filter(file => file.endsWith('.json'))
                .map(file => file.replace('.json', ''));
        } catch (error) {
            throw new AppError('Error loading Bible versions', 500);
        }
    }

    static async getBooks(version: string) {
        try {
            const versionPath = path.join(this.dataPath, `${version}.json`);
            const content = await fs.readFile(versionPath, 'utf-8');
            
            // Remove BOM se existir
            const cleanContent = content.replace(/^\uFEFF/, '');
            
            const bibleData = JSON.parse(cleanContent);
            
            // Assumindo que o JSON é um array de livros
            return bibleData.map((book: any) => ({
                name: book.name,
                abbrev: book.abbrev
            }));
        } catch (error) {
            console.error('Erro ao ler arquivo:', error);
            throw new AppError('Error loading Bible books', 500);
        }
    }

    static async getChapters(version: string, book: string) {
        try {
            const versionPath = path.join(this.dataPath, `${version}.json`);
            const content = await fs.readFile(versionPath, 'utf-8');
            const cleanContent = content.replace(/^\uFEFF/, '');
            const bibleData = JSON.parse(cleanContent);
            
            const bookData = bibleData.find((b: any) => 
                b.abbrev.toLowerCase() === book.toLowerCase() ||
                b.name.toLowerCase() === book.toLowerCase()
            );

            if (!bookData) {
                throw new AppError('Book not found', 404);
            }

            return bookData.chapters.map((_: any, index: number) => index + 1);
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('Error loading chapters', 500);
        }
    }

    static async getVerses(version: string, book: string, chapter: string) {
        try {
            const versionPath = path.join(this.dataPath, `${version}.json`);
            const content = await fs.readFile(versionPath, 'utf-8');
            const cleanContent = content.replace(/^\uFEFF/, '');
            const bibleData = JSON.parse(cleanContent);
            
            const bookData = bibleData.find((b: any) => 
                b.abbrev.toLowerCase() === book.toLowerCase() ||
                b.name.toLowerCase() === book.toLowerCase()
            );

            if (!bookData) {
                throw new AppError('Book not found', 404);
            }

            const chapterNum = parseInt(chapter);
            if (!bookData.chapters[chapterNum - 1]) {
                throw new AppError('Chapter not found', 404);
            }

            return bookData.chapters[chapterNum - 1];
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('Error loading verses', 500);
        }
    }
} 