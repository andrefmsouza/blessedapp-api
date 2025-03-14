import { AppError } from "./AppError";

export async function handleController(action: () => Promise<{ status: number; json: any }>) {
    try {
        return await action();
    } catch (error: any) {
        throw new AppError(error.message || "Erro interno", error.status || 500);
    }
}