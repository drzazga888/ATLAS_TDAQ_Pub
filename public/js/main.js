import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProjectList from './components/project-list';
import GoogleSignIn from './components/google-sign-in';

$(document).ready(function(){

    ReactDOM.render(
        <ProjectList url="/api/project/" />,
        $('#project-list')[0]
    );

    ReactDOM.render(
        <GoogleSignIn client="570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com" />,
        $('#google-signin')[0]
    );

    $(document).on('google-sign-in-status-changed', function() {
        console.log('google-sign-in-status-changed');
    });

});
