define(["app", "js/addappointments/addappointmentsView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var name = '';

    var bindings = [
        {
            element: '#btnAddAppointment',
            event: 'click',
            handler: addAppointment
        }
    ];

    function init(query) {
        databaseHandler.getClientsAppointment();
        app.f7.closePanel(true);
        makePage(query);
        View.render({
            bindings: bindings
        });
    }

    function makePage(query) {
        if (query.name) {
            console.log('has name');
            name = query.name;

            $('#user_name').val(name);
            $('#user_name').prop('disabled', true);
        }
        View.fillImage();
        preparePage();
        app.f7.keypad({
            input: '#client_number',
            valueMaxLength: 12,
            dotButton: false
        });
    }

    function preparePage() {

        var clients = [];
        var types = [
            'Full Set',
            'Fill',
            'Half Set'
        ];

        var clientsJSON = JSON.parse(localStorage.getItem(strings.clients));
        var clientsJSON = $.map(clientsJSON, function (el) {
            return el
        });
        clientsJSON.forEach(function (value) {
            clients.push(value.name);
        });
        app.f7.calendar({
            input: '#appointment_date',
            onlyOnPopover: true,
            closeOnSelect: true
        });
        $('#appointment_time').mdtimepicker({
            timeFormat: 'hh:mm.000',
            format: 'hh:mm'
        });
        // Simple Dropdown
        app.f7.autocomplete({
            input: '#user_name',
            openIn: 'dropdown',
            notFoundText: 'Add this client first',
            source: function (autocomplete, query, render) {
                var results = [];
                if (query.length === 0) {
                    render(results);
                    return;
                }
                // You can find matched items
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(clients[i]);
                }
                // Display the items by passing array with result items
                render(results);
            }
        });
        app.f7.autocomplete({
            input: '#lash_type',
            openIn: 'dropdown',
            notFoundText: 'Add this type first',
            source: function (autocomplete, query, render) {
                var results = [];
                if (query.length === 0) {
                    render(results);
                    return;
                }
                // You can find matched items
                for (var i = 0; i < types.length; i++) {
                    if (types[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(types[i]);
                }
                // Display the items by passing array with result items
                render(results);
            }
        });
    }

    function addAppointment() {
        var VF = [
            $('#user_name'),
            $('#appointment_date'),
            $('#appointment_time'),
            $('#lash_type')
        ];

        if ($.fn.fieldsValid(VF, app)) {
            databaseHandler.getClient(app, $('#user_name').val(), plusAppointment);
        }
    }

    function plusAppointment(data) {
        console.log(data);
        databaseHandler.addAppointment(app, data._id, $('#appointment_date').val(), $('#appointment_time').val(), $('#lash_type').val());
    }

    return {
        init: init
    };
});