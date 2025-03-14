import { ExpressAdapterParams } from "../types/ExpressAdapter.types";
import { handleController } from "../utils/handleController";
import { OutlinesService } from "../services/outlines.service";
import { createOutlineSchema } from "../validators/outline.validator";

export class OutlinesController {
    static async create(data: ExpressAdapterParams) {
        return handleController(async () => {
            const validatedData = createOutlineSchema.parse(data.body);
            const outline = await OutlinesService.create({
                ...validatedData,
                userId: data.locals.userId
            });
            
            return {
                status: 201,
                json: {
                    status: true,
                    data: outline
                }
            };
        });
    }

    static async list(data: ExpressAdapterParams) {
        return handleController(async () => {
            const outlines = await OutlinesService.findByUserId(data.locals.userId);
            return {
                status: 200,
                json: {
                    status: true,
                    data: outlines
                }
            };
        });
    }

    static async show(data: ExpressAdapterParams) {
        return handleController(async () => {
            const outline = await OutlinesService.findById(
                data.locals.userId,
                data.params.id
            );
            return {
                status: 200,
                json: {
                    status: true,
                    data: outline
                }
            };
        });
    }

    static async update(data: ExpressAdapterParams) {
        return handleController(async () => {
            const validatedData = createOutlineSchema.partial().parse(data.body);
            const outline = await OutlinesService.update(
                data.locals.userId,
                data.params.id,
                validatedData
            );
            return {
                status: 200,
                json: {
                    status: true,
                    data: outline
                }
            };
        });
    }

    static async delete(data: ExpressAdapterParams) {
        return handleController(async () => {
            await OutlinesService.delete(data.locals.userId, data.params.id);
            return {
                status: 204,
                json: {
                    status: true,
                    message: "Outline deleted successfully"
                }
            };
        });
    }
} 