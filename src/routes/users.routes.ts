import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../middlewares/errorHandler";
import ExpressAdapter from "../adapter/ExpressAdapter";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router.get("/me", authMiddleware, ExpressAdapter.create(UsersController.me), errorHandler);

export default router;
