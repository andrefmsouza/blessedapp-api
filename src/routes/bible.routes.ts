import { Router } from "express";
import ExpressAdapter from "../adapter/ExpressAdapter";
import { BibleController } from "../controllers/bible.controller";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.get("/", ExpressAdapter.create(BibleController.getVersions), errorHandler);
router.get("/:version", ExpressAdapter.create(BibleController.getBooks), errorHandler);
router.get("/:version/:book", ExpressAdapter.create(BibleController.getChapters), errorHandler);
router.get("/:version/:book/:chapter", ExpressAdapter.create(BibleController.getVerses), errorHandler);

export default router; 