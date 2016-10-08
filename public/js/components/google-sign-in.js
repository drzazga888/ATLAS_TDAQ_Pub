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
        if (isSignedIn) {
            $(document).trigger('google-logged-in');
            localStorage.setItem('token', 'SAMPLE_API_TOKEN');
            this.setState({
                identity: 'SAMPLE_USER_NAME'
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
                    console.log('ok  d yee');
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
                <p className="inline-element">
                    {mainText}
                    <em>{identityText}</em>
                </p>
                {shouldLogOutButtonVisible ? <button onClick={this.signOut.bind(this)}>Log out</button> : null}
                {shouldLogInButtonVisible ? <button onClick={this.signIn.bind(this)}>Log in</button> : null}
            </div>
        );
    }

};
