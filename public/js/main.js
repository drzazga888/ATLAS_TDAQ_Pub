import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProjectList from './components/project-list';
import GoogleSignIn from './components/google-sign-in';
import ProjectForm from './components/project-form';

$(document).ready(function(){

    ReactDOM.render(
        <ProjectList url="/api/project/" />,
        $('#project-list')[0]
    );

    ReactDOM.render(
        <ProjectForm
            apiKey="AIzaSyC0Y7UDbqI2urerN7tKQ5-5rUnbYniDS-o"
            client="570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com"
            docsUrl="/api/google-docs/"
        />,
        $('#project-form')[0]
    );

    ReactDOM.render(
        <GoogleSignIn
            client="570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com"
            apiKey="AIzaSyC0Y7UDbqI2urerN7tKQ5-5rUnbYniDS-o"
        />,
        $('#google-signin')[0]
    );

    $.getScript('https://apis.google.com/js/api.js', function() {
        "use strict";
        $(document).trigger('google-apis-loaded');
    });

});
