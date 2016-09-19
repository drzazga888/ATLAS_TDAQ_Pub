var GoogleSignIn = React.createClass({
    gAuth: null,
    getInitialState: function() {
        localStorage.removeItem('token');
        return {message: 'You are not logged in', loggedIn: false};
    },
    componentDidMount: function() {
        var reactThis = this;
        jQuery.getScript('https://apis.google.com/js/platform.js', function() {
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
    },
    logOut: function() {
        this.gAuth.signOut();
        localStorage.removeItem('token');
        // promise...
        this.setState(this.getInitialState());
    },
    render: function() {
        return (
            <div>
                <div id="google-sign-in-button"></div>
                <p>{this.state.message}</p>
                {this.state.loggedIn ? <button onClick={this.logOut}>Log out</button> : null}
            </div>
        );
    }
});

var ProjectList = React.createClass({
    getInitialState: function() {
        return {data: [], message: null};
    },
    componentDidMount: function() {
        if (localStorage.getItem('token')) {
            this.setState({message: "Loading..."});
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data, message: null});
                }.bind(this),
                beforeSend: function(xhr){
                    xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
                }
            });
        } else {
            this.setState({message: "You are not logged in."});
        }
    },
    render: function() {
        var itemNodes = this.state.data.map(function(item) {
            return <ProjectListItem key={item.id} name={item.name} />;
        });
        return (
            <div className="block">
                <header>
                    <h2>Project list</h2>
                </header>
                <section>
                    {itemNodes}
                </section>
                <footer>
                    <p className="message">{this.state.message}</p>
                </footer>
            </div>
        );
    }
});

var ProjectListItem = React.createClass({
    render: function() {
        return <p>{this.props.name}</p>
    }
});

$(document).ready(function(){

    ReactDOM.render(
        <ProjectList url="/api/project/" />,
        $('#project-list')[0]
    );

    ReactDOM.render(
        <GoogleSignIn client="570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com" />,
        $('#google-signin')[0]
    );

});
