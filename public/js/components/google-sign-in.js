import React from 'react';
import $ from 'jquery';

export default class GoogleSignIn extends React.Component {

    constructor(props) {
        super(props);
        this.gAuth = null;
        this.initialState = {
            message: 'You are not logged in',
            loggedIn: false
        };
        this.state = this.initialState;
    }

    componentDidMount() {
        var reactThis = this;
        $.getScript('https://apis.google.com/js/platform.js', function() {
            gapi.load('auth2', function() {
                reactThis.gAuth = gapi.auth2.init({
                    client_id: reactThis.props.client,
                    //fetch_basic_profile: false,
                    scope: 'profile'
                });
                gapi.signin2.render('google-sign-in-button', {
                    theme: 'dark',
                    onSuccess: function(googleUser) {
                        var profile = googleUser.getBasicProfile();
                        localStorage.setItem('token', googleUser.getAuthResponse().id_token);
                        reactThis.setState({message: 'Logged in as ' + profile.getName() + ' (' + profile.getEmail() + ')', loggedIn: true});
                        $(document).trigger('google-logged-in');
                    },
                    onFailure: function() {
                        reactThis.setState({message: 'Error while authenticating', loggedIn: false});
                    }
                });
            });
        });
    }

    logOut() {
        this.gAuth.signOut();
        localStorage.removeItem('token');
        this.setState(this.initialState);
        $(document).trigger('google-logged-out');
    }

    render() {
        return (
            <div>
                <div className="block">
                    <div id="google-sign-in-button"></div>
                </div>
                <p className="block">{this.state.message}</p>
                {this.state.loggedIn ? <button className="button" onClick={this.logOut.bind(this)}>Log out</button> : null}
            </div>
        );
    }

};
