import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProjectList from './components/project-list';
import GoogleSignIn from './components/google-sign-in';
import ProjectForm from './components/project-form';

$(document).ready(function(){

    var googleApiKey = "AIzaSyC0Y7UDbqI2urerN7tKQ5-5rUnbYniDS-o";
    var googleClient = "570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com";

    ReactDOM.render(
        <ProjectList url="/api/project/" />,
        $('#project-list')[0]
    );

    ReactDOM.render(
        <ProjectForm
            apiKey={googleApiKey}
            client={googleClient}
            url="/api/project/"
        />,
        $('#project-form')[0]
    );

    ReactDOM.render(
        <GoogleSignIn
            apiKey={googleApiKey}
            client={googleClient}
        />,
        $('#google-signin')[0]
    );

    $.getScript('https://apis.google.com/js/api.js', function() {
        "use strict";
        $(document).trigger('google-apis-loaded');
    });

});
