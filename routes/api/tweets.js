/**
 * Created by vnguyen on 8/31/16.
 */
import express from 'express';
import {getTweets} from '../../utils/twitter';

const router = express.Router();

router.get('/:screen_name', fetchTweetsByUser);
router.get('/:screen_name/:count', fetchTweetsByUser);

export default router;
/**
 * Function to grab tweets for user, as long as params matches name it will work
 * @param req
 * @param res
 */
function fetchTweetsByUser(req, res) {
    let {screen_name} = req.params;
    if (screen_name[0] !== '@') {
        screen_name = `@${screen_name}`;
    }
    getTweets(req.params)
        .then((tweets)=> {
            res.statusCode = 200;
            res.json({
                screen_name,
                tweets
            });
        }, (err)=> {
            res.statusCode = 500;
            res.json(err)
        })
}