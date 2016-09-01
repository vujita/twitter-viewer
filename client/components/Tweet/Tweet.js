/**
 * Created by vnguyen on 9/1/16.
 */
import React, {PropTypes, Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {ListItem} from 'material-ui/List';
import moment from 'moment';
export default class Tweet extends Component {
    render() {
        let {tweet} = this.props,
            {user, created_at} = tweet,
            {followers_count, friends_count, following} = user;
        return (
            <ListItem>
                <Card expanded={true}>
                    <CardHeader
                        title={user.screen_name}
                        subtitle={moment(created_at).fromNow()}
                        avatar={user.profile_image_url}
                    />
                    <CardText>
                        Followers: {followers_count}, Following: {following || 'N/A'}, Friends: {friends_count}
                    </CardText>
                    <CardText>
                        {tweet.text}
                    </CardText>
                </Card>
            </ListItem>
        )
    }
}
Tweet.propTypes = {
    tweet: PropTypes.object.isRequired
}