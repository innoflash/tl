define(["app", "js/addclients/addclientsView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [ 
        {
            element: '#btnAddClient',
            event: 'click',
            handler: addClient
        }
    ];

    function init() {
        app.f7.closePanel(true);
        View.fillImage();

        app.f7.keypad({
            input: '#client_number',
            valueMaxLength: 12,
            dotButton: false
        });
        View.render({
            bindings: bindings
        });
    }
    
    function addClient() {
        var VF = [
            $('#client_name'),
            $('#client_number')
        ];

        if ($.fn.fieldsValid(VF, app)) {
            var name = $('#client_name').val().replace(/\b\w/g, function(l){ return l.toUpperCase() });
            var number = $('#client_number').val();
            databaseHandler.addClient(app, name, number);
        }
    }

    return {
        init: init
    };
});