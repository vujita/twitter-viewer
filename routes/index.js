/**
 * Created by vuthasone on 8/30/2016.
 */
import express from 'express';
import apiRouter from './api';
/**
 * Using this router instead of directly mounting to the app/server. This gives more flexibility and modularity.
 * I also like the option of my api mirroring my folders a bit
 */
const router = express.Router();
/**
 * Attach on the api endpoint from this fixture
 */
router.use('/api', apiRouter);

export default router;