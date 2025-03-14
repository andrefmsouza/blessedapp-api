import { OutlinesRepository } from "../repositories/outlines.repository";
import { Outline } from "../models/outline.model";
import { AppError } from "../utils/AppError";

export class OutlinesService {
    static async create(outline: Outline) {
        return await OutlinesRepository.create(outline);
    }

    static async findById(userId: string, id: string) {
        const outline = await OutlinesRepository.findById(userId, id);
        if (!outline) throw new AppError("Outline not found", 404);
        return outline;
    }

    static async findByUserId(userId: string) {
        return await OutlinesRepository.findByUserId(userId);
    }

    static async update(userId: string, id: string, outline: Partial<Outline>) {
        const existingOutline = await OutlinesRepository.findById(userId, id);
        if (!existingOutline) throw new AppError("Outline not found", 404);
        
        return await OutlinesRepository.update(userId, id, outline);
    }

    static async delete(userId: string, id: string) {
        const outline = await OutlinesRepository.findById(userId, id);
        if (!outline) throw new AppError("Outline not found", 404);
        
        await OutlinesRepository.delete(userId, id);
    }
} 