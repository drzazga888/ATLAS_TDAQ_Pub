import React from 'react';
import $ from 'jquery';

export default class GoogleSignIn extends React.Component {

    constructor(props) {
        super(props);
        localStorage.removeItem('token');
        this.gAuth = null;
        this.state = {
            message: 'You are not logged in',
            loggedIn: false
        };
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
                    },
                    onFailure: function() {
                        reactThis.setState({message: 'Bad credentials', loggedIn: false});
                    }
                });
            });
        });
    }

    logOut() {
        this.gAuth.signOut();
        localStorage.removeItem('token');
        this.setState(this.getInitialState());
    }

    render() {
        return (
            <div>
                <div id="google-sign-in-button"></div>
                <p>{this.state.message}</p>
                {this.state.loggedIn ? <button onClick={this.logOut}>Log out</button> : null}
            </div>
        );
    }

};
