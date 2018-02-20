define(["app", "js/client/clientView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var _id = 0;

    var bindings = [
        {
            element: '#options',
            event: 'click',
            handler: optionsMenu
        }
    ];

    function init(query) {
        app.f7.closePanel(true);
        View.fillImage();
        _id = query.id;
        loadClient();
        View.render({
            bindings: bindings
        });
    }

    function loadClient() {
        databaseHandler.getClientByID(app, _id, fillClient);
    }

    function fillClient(data) {
        console.log(data);
        View.fillBasic(data);

        databaseHandler.getClientAppointments(_id, fillAppointments);
    }

    function fillAppointments(data) {
        console.log(data);
        if (data.length == 0) {
            View.showBlank();
        }else{
            View.fillAppointments(data);
        }
    }

    function optionsMenu() {
        var buttons = [
            {
                text: 'Options',
                label: true
            },
            {
                text: 'Delete Client',
                onClick: function () {

                }
            },
            {
                text: 'Edit Client',
                onClick: function () {

                }
            },
            {
                text: 'Cancel',
                color: 'red'
            }
        ];
        app.f7.actions(buttons);
    }


    return {
        init: init
    };
});