import React from 'react';
import config from '../config.js';

export default class GoogleSignIn extends React.Component {

    constructor(props) {
        super(props);
        this.auth2 = null;
        this.state = {
            identity: null,
            loaded: false
        };
    }

    updateSignInStatus(isSignedIn) {
        var user = this.auth2.currentUser.get();
        if (isSignedIn) {
            var authResponse = user.getAuthResponse();
            config.tokens.set_all(authResponse.id_token, authResponse.access_token);
            this.setState({
                identity: user.getBasicProfile().getName()
            });
        } else {
            config.tokens.unset_all();
            this.setState({
                identity: null
            });
        }
    }

    componentDidMount() {
        var reactThis = this;
        gapi.load('client:auth2', function() {
            gapi.client.setApiKey(config.keys.api);
            reactThis.gAuth = gapi.auth2.init({
                client_id: config.keys.client,
                //fetch_basic_profile: false,
                scope: config.scope
            }).then(function() {
                reactThis.auth2 = gapi.auth2.getAuthInstance();
                reactThis.setState({
                    loaded: true
                });
                reactThis.auth2.isSignedIn.listen(reactThis.updateSignInStatus.bind(reactThis));
                reactThis.updateSignInStatus(reactThis.auth2.isSignedIn.get());
            });
        });
    }

    signIn() {
        this.auth2.signIn();
    }

    signOut() {
        this.auth2.signOut();
    }

    render() {
        var mainText;
        var identityText;
        var shouldLogInButtonVisible;
        var shouldLogOutButtonVisible;
        if (!this.state.loaded) {
            mainText = 'Loading...';
            identityText = null;
            shouldLogInButtonVisible = false;
            shouldLogOutButtonVisible = false;
        } else if (!this.state.identity) {
            mainText = 'Please log in';
            identityText = 'You\'re a guest';
            shouldLogInButtonVisible = true;
            shouldLogOutButtonVisible = false;
        } else {
            mainText = 'Logged in';
            identityText = this.state.identity;
            shouldLogInButtonVisible = false;
            shouldLogOutButtonVisible = true;
        }
        return (
            <div className="inline-wrapper">
                <span className="inline-element">{mainText}</span>
                <em className="inline-element">{identityText}</em>
                {shouldLogOutButtonVisible ? <button className="inline-element" onClick={this.signOut.bind(this)}>Log out</button> : null}
                {shouldLogInButtonVisible ? <button className="inline-element" onClick={this.signIn.bind(this)}>Log in</button> : null}
            </div>
        );
    }

};
