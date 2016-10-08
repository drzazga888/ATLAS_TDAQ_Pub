import React from 'react';
import $ from 'jquery';

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
            $(document).trigger('google-logged-in');
            localStorage.setItem('token', user.getAuthResponse().id_token);
            this.setState({
                identity: user.getBasicProfile().getName()
            });
        } else {
            $(document).trigger('google-logged-out');
            localStorage.removeItem('token');
            this.setState({
                identity: null
            });
        }
    }

    componentDidMount() {
        var reactThis = this;
        $(document).on('google-apis-loaded', function() {
            gapi.load('client:auth2', function() {
                gapi.client.setApiKey(reactThis.props.apiKey);
                reactThis.gAuth = gapi.auth2.init({
                    client_id: reactThis.props.client,
                    //fetch_basic_profile: false,
                    scope: 'profile'
                }).then(function () {
                    reactThis.auth2 = gapi.auth2.getAuthInstance();
                    reactThis.setState({
                        loaded: true
                    });
                    reactThis.auth2.isSignedIn.listen(reactThis.updateSignInStatus.bind(reactThis));
                    reactThis.updateSignInStatus(reactThis.auth2.isSignedIn.get());
                });
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
