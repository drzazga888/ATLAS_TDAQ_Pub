import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProjectBox from './components/project-box';
import GoogleSignIn from './components/google-sign-in';

ReactDOM.render(
    <ProjectBox url="/api/project/" />,
    $('#project-box')[0]
)

ReactDOM.render(
    <GoogleSignIn />,
    $('#google-signin')[0]
);
