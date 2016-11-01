import $ from 'jquery';
import config from './config';

$.apiCallPrefix = '/api';

$.apiCall = function(method, url, data) {
    "use strict";

    if (data === undefined) {
        data = null;
    }

    return $.ajax({
        url: $.apiCallPrefix + url,
        dataType: 'json',
        data: data ? JSON.stringify(data) : null,
        method: method,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', JSON.stringify(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()));
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
    });

};
