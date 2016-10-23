import $ from 'jquery';

var config = {

    scope: 'profile https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive',

    keys: {
        api: "AIzaSyC0Y7UDbqI2urerN7tKQ5-5rUnbYniDS-o",
        client: "570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com"
    },

    tokens: {

        id: undefined,
        access: undefined,

        set_all: function(id, access) {
            "use strict";
            config.tokens.id = id;
            config.tokens.access = access;
            $(document).trigger('auth-granted');
        },

        unset_all: function() {
            "use strict";
            $(document).trigger('auth-revoked');
            config.tokens.id = null;
            config.tokens.access = null;
        }

    }

};

export default config;