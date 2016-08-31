/**
 * Created by vnguyen on 8/30/16.
 */
/**
 * After much debate, I decided to use this lib for oauth.
 * It much more accurately matches what one would do in a real world scenario.
 * If there is a package available that idiomatically handles the task, then it beats rewritting it.
 * I also wanted it in this util, so if I wanted to refactor it out. Then it would be a quick code change,
 * I could either swap out the code here or publish my own twitter lib and bring it in either on git or npm
 */
import Twitter from 'twitter';
let client;

export function setConfig(config) {
    let {
            consumer_key, consumer_secret, access_token_key, access_token_secret
        } = config,
        twitCfg = {
            consumer_key,
            consumer_secret,
            access_token_key,
            access_token_secret
        };
    client = new Twitter(twitCfg);
}
/**
 * Util function to grab tweets of a user by screen_name
 * @param screen_name User to grab screen_name of
 * @param options
 * @returns {Promise}
 */
export function getTweets(options) {
    return new Promise((resolve, reject)=> {
        if (!options) {
            reject('Invalid options');
        } else if (!client) {
            reject('Twtitter keys are not set or client not initialized');
        } else {
            client.get('statuses/user_timeline', options, function (error, tweets, response) {
                if (!error) {
                    resolve(tweets);
                } else {
                    reject(error);
                }
            });
        }
    });
}