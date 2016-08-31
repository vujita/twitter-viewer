/**
 * Created by vuthasone on 8/30/2016.
 */
import express from 'express';
const router = express.Router();


router.get('/recenttweets/:username', (req, res)=> {
    res.json({
        username:req.params.username,
        tweets: [{
            id: 'some id',
            tweet: 'some awesomeness'
        }]
    })
});


export default router;