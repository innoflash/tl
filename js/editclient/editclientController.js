define(["app", "js/editclient/editclientView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var _id = 0;

    var bindings = [];

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
        View.fillClient(data);

        app.f7.keypad({
            input: '#edit_client_number',
            valueMaxLength: 12,
            dotButton: false
        });
        $('#btnEditClient').on('click', function () {
            editClient();
        });
    }

    function editClient() {
        var VF = [
            $('#edit_client_name'),
            $('#edit_client_number')
        ];

        if ($.fn.fieldsValid(VF, app)) {
            var name = $('#edit_client_name').val().replace(/\b\w/g, function (l) {
                return l.toUpperCase()
            });
            var number = $('#edit_client_number').val();
            databaseHandler.updateClient(app, _id, name, number);
        }
    }

    return {
        init: init
    };
});