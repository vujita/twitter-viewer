/**
 * Created by vuthasone on 8/30/2016.
 */
import express from 'express';
import tweets from './tweets';

const router = express.Router();
router.use('/tweets', tweets);

export default router;