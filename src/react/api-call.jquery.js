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
        data: data,
        method: method,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', config.tokens.id);
        }
    });

};
