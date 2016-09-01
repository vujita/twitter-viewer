/**
 * Created by vnguyen on 9/1/16.
 */
import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tweetActions from '../../actions/loadTweets';
import Tweet from '../Tweet';

const mapStateToProps = (state)=>({
    appState: state
});
const mapDispatchToProps = (dispatch)=>({
    actions: bindActionCreators(tweetActions, dispatch)
});
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                screen_name: ''
            });
            //I could do the fetch here, but it feels so lazy.
        }
    }

    onSearch() {
        let {actions, router, params} = this.props,
            {screen_name} = this.state;
        if (params.screen_name !== screen_name) {
            router.push(screen_name);
            actions.fetchTweets(screen_name)
        }

    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    onChange(e) {
        //Always have at least an @ symbol
        let v = e.target.value;
        this.setState({
            screen_name: v
        });
    }

    render() {
        let {appState, actions, params} = this.props,
            {userTweets} = appState,
            {err, tweets, currentTwitterUser} = userTweets,
            isError = !err;
        return (
            <MuiThemeProvider>
                <div>
                    <TextField hintText={"@NitroHQ"}
                               value={(this.state.screen_name || params.screen_name).toUpperCase()}
                               onChange={this.onChange.bind(this)}
                               onKeyDown={this.onKeyDown.bind(this)}
                    />
                    <RaisedButton onClick={this.onSearch.bind(this)}
                                  label="Search"
                                  disabled={!this.state.screen_name || this.state.screen_name===appState.userTweets.currentTwitterUser}
                    />
                    {err && <h2>Error Loading tweets</h2>}
                    <List>
                        {tweets && tweets.map((t, i)=><Tweet tweet={t} key={`tweet=${i}`}/>)}
                    </List>
                </div>
            </MuiThemeProvider>
        )
    }
}