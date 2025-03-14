import { Router } from "express";
import userRoutes from "./users.routes";
import loginRoutes from "./auth.routes";
import outlinesRoutes from "./outlines.routes";
import bibleRoutes from "./bible.routes";


const router = Router();

router.use("/", loginRoutes);
router.use("/users", userRoutes);
router.use("/outlines", outlinesRoutes);
router.use("/bible", bibleRoutes);

export default router;