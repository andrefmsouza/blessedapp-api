import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { errorHandler } from "../middlewares/errorHandler";
import ExpressAdapter from "../adapter/ExpressAdapter";

const router = Router();

router.post("/register", ExpressAdapter.create(AuthController.register), errorHandler);
router.post("/login", ExpressAdapter.create(AuthController.login), errorHandler);

export default router;
