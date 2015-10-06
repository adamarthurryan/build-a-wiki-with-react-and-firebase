import React from 'react';
import {RouteHandler} from 'react-router';

import Login from './Login';
import PageList from './PageList';

import * as API from '../api';


export default class App extends React.Component {
    //get the initial state in the constructor
    constructor() {
        super();

        var authData = API.getAuthData();
        var user = {loggedin: (authData!=null), email: (authData?authData.password.email:null)};

        this.state = {user}
    }

    //when the component is mounted, register its listeners
    componentDidMount() {
        //note that the callback must be bound to this
        API.onAuth(this.authChanged.bind(this));
    }
    componentWillUnmount() {
        API.offAuth(this.authChanged);
    }

    render () {
        return <div>
            <div className='row'>
                <div className='three columns'>
                    <h1> Wicker </h1>

                    <Login user={this.state.user} />

                    <PageList user={this.state.user} />

                </div>
                <div className='nine columns'>
                    <RouteHandler user={this.state.user} />
                </div>
            </div>
        </div>;
    }

    // the callback for authorization changes
    authChanged (authData)  {
        var user = {loggedin: (authData!=null), email: (authData?authData.password.email:null)};
        this.setState({user});
    }
}
