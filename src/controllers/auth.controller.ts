import { AuthService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { handleController } from "../utils/handleController";
import { ExpressAdapterParams } from "../types/ExpressAdapter.types";

export class AuthController {
    static async register(data: ExpressAdapterParams) {
        return handleController(async () => {
            const validatedData = registerSchema.parse(data.body);
            const user = await AuthService.register(validatedData.name, validatedData.email, validatedData.password);
            return {
              status: 201,
              json: {
                status: true,
                data: user
              }
            };
        });
    }

    static async login(data: ExpressAdapterParams) {
        return handleController(async () => {
            const validatedData = loginSchema.parse(data.body);
            const token = await AuthService.login(validatedData.email, validatedData.password);
            return {
              status: 201,
              json: {
                status: true,
                token: token.token
              }
            };
        });
    }
}
