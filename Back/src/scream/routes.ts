import { Router } from 'express';
import { checkJwt } from "../middlewares/authMiddleware.ts";
import task from './tasks/controllers.ts';

const router = Router()

router.use('/tasks', checkJwt, task);

export default router;
