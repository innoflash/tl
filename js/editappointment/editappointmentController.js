define(["app", "js/editappointment/editappointmentView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var _id = 0;

    var bindings = [];

    function init(query) {
        app.f7.closePanel(true);
        View.fillImage();
        _id = query.id;
        loadAppointment();
        View.render({
            bindings: bindings
        });
    }

    function loadAppointment() {
        databaseHandler.getAppointment(_id, fillAppointment);
    }

    function fillAppointment(data) {
        var types = [
            'Full Set',
            'Fill',
            'Half Set'
        ];
        View.fillAppointment(data);

        app.f7.calendar({
            input: '#edit_appointment_date',
            onlyOnPopover: true,
            closeOnSelect: true
        });
        $('#edit_appointment_time').mdtimepicker({
            timeFormat: 'hh:mm.000',
            format: 'hh:mm'
        });
        app.f7.autocomplete({
            input: '#edit_lash_type',
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


        $('#btnEditAppointment').on('click', function () {
            var VF = [
                $('#edit_appointment_date'),
                $('#edit_appointment_time'),
                $('#edit_lash_type')
            ];

            if ($.fn.fieldsValid(VF, app)) {
                databaseHandler.editAppointment(app, _id, $('#edit_appointment_date').val(), $('#edit_appointment_time').val(), $('#edit_lash_type').val());
            }
        });
    }

    return {
        init: init
    };
});