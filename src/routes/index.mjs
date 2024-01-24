import { Router } from "express";
import usersRouter from "../routes/users.mjs";
import productsRouter from "../routes/products.mjs";
import authRouter from "../routes/auth.mjs";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);

export default router;
