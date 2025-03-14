import { UsersService } from "../services/users.service";
import { userIdSchema } from "../validators/user.validator";
import { handleController } from "../utils/handleController";
import { ExpressAdapterParams } from "../types/ExpressAdapter.types";
export class UsersController {
    static async me(data: ExpressAdapterParams) {
      return handleController(async () => {
        const validatedParams = userIdSchema.parse(data.locals);
        const user = await UsersService.getUserById(validatedParams.userId);
        return {
          status: 201,
          json: {
            status: true,
            data: user
          }
        };
      });
        
    }
}
