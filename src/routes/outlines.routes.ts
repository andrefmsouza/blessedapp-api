import { Router } from "express";
import ExpressAdapter from "../adapter/ExpressAdapter";
import { OutlinesController } from "../controllers/Outlines.controller";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.post("/", authMiddleware, ExpressAdapter.create(OutlinesController.create), errorHandler);
router.get("/", authMiddleware, ExpressAdapter.create(OutlinesController.list), errorHandler);
router.get("/:id", authMiddleware, ExpressAdapter.create(OutlinesController.show), errorHandler);
router.put("/:id", authMiddleware, ExpressAdapter.create(OutlinesController.update), errorHandler);
router.delete("/:id", authMiddleware, ExpressAdapter.create(OutlinesController.delete), errorHandler);

export default router; 