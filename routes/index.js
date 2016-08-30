/**
 * Created by vuthasone on 8/30/2016.
 */
import express from 'express';
import apiRouter from './api';
const router = express.Router();

router.use('/api', apiRouter);

export default router;