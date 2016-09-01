/**
 * Created by vnguyen on 9/1/16.
 */
import {fetchTweets} from '../tweets';

describe('Testing tweet api', ()=> {
    it('fetch tweets', ()=> {
        fetchTweets('@NitroHQ').then((data)=> {
            expect(data).toBeTruthy();
            expect(data.screen_name).toBe('@Nitro');
        }).fail((err)=> {
            expect(false).toBe(true);
        });
    })
})