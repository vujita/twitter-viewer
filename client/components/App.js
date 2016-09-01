/**
 * Created by vnguyen on 9/1/16.
 */
import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tweetActions from '../actions/loadTweets';

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

    onChange(e) {
        //Always have at least an @ symbol
        let v = e.target.value;
        if (!v) {
            v = '@';
        } else if (v[0] !== '@') {
            v = '@' + v;
        }
        this.setState({
            screen_name: v
        });
    }

    render() {
        let {appState, actions, params} = this.props;
        return (
            <div>
                <input type="textfield" value={this.state.screen_name || params.screen_name}
                       onChange={this.onChange.bind(this)}/>
                <button onClick={this.onSearch.bind(this)}
                        disabled={!this.state.screen_name || this.state.screen_name===appState.userTweets.currentTwitterUser}>Search
                </button>
                <p>
                    {this.state.screen_name}
                </p>
                <p>
                    {JSON.stringify(params, null, 2)}
                </p>
            </div>
        )
    }
}