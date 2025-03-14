
import { UsersRepository } from "../repositories/users.repository";
import { AppError } from "../utils/AppError";

export class UsersService {
    static async getUserById(id: string) {
        const user = await UsersRepository.findById(id);
        if (!user) throw new AppError("User not found", 404);
        return user;
    }
}
