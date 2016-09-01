/**
 * Created by vnguyen on 9/1/16.
 */
import React, {Component, PropTypes} from 'react';
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
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                screen_name: ''
            })
        }
    }

    onSearch() {
        let {actions, history} = this.props;
        history.push(this.state.screen_name);
        actions.loadTweets(this.state.screen_name)

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
        console.log(this.props);
        return (
            <div>
                <input type="textfield" value={this.state.screen_name || params.screen_name}
                       onChange={this.onChange.bind(this)}/>
                <button onClick={this.onSearch.bind(this)}>Search
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