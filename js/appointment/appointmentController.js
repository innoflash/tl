define(["app", "js/appointment/appointmentView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var _id = 0;

    var bindings = [
        {
            element: '#btnTabEdit',
            event: 'click',
            handler: edit
        },
        {
            element: '#btnTabCancel',
            event: 'click',
            handler: cancel
        },
        {
            element: '#btnTabFinish',
            event: 'click',
            handler: finish
        }
    ];

    function init(query) {
        _id = query.id;
        app.f7.closePanel(true);
        View.fillImage();
        loadAppointment();
        View.render({
            bindings: bindings
        });
    }

    function loadAppointment() {
        console.log(_id + " is the id");
        databaseHandler.getAppointment(_id, fillAppointment);
    }

    function edit() {
        app.mainView.router.loadPage("pages/editappointment.html?id=" + _id);
    }

    function cancel() {
        var buttons = [
            {
                text: 'Cancel Appointment',
                label: true
            },
            {
                text: 'Yes, Cancel',
                onClick: function () {
                    databaseHandler.cancelAppointment(app, _id);
                }
            },
            {
                text: 'No, Dont',
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

    function finish() {
        console.log('finished');
        app.f7.popup('.popup-finish');

        var transactionTypes = [
            'CASH',
            'EFT'
        ];

        app.f7.keypad({
            input: '#appointment_amount',
            valueMaxLength: 5,
            dotButton: false
        });

        app.f7.autocomplete({
            input: '#payment_method',
            openIn: 'dropdown',
            notFoundText: 'Add this type first',
            source: function (autocomplete, query, render) {
                var results = [];
                if (query.length === 0) {
                    render(results);
                    return;
                }
                // You can find matched items
                for (var i = 0; i < transactionTypes.length; i++) {
                    if (transactionTypes[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(transactionTypes[i]);
                }
                // Display the items by passing array with result items
                render(results);
            }
        });

        $('#btnFinish').on('click', function () {
            var VF = [
                $('#appointment_amount'),
                $('#payment_method')
            ];

            if ($.fn.fieldsValid(VF, app)) {
                var amount = $('#appointment_amount').val();
                var method = $('#payment_method').val();
                var notes = $('#notes').val();
                databaseHandler.addPayment(app, _id, amount, method, notes, clearFields);
            }
        });

        $('#closeFinish').on('click', function () {
            app.f7.closeModal('.popup-finish');
        });
    }

    function fillAppointment(data) {
        View.fillAppointment(data);
        console.log(data);
        if (data._completed == true) {
            databaseHandler.getPayment(_id, fillPayment);
            $('.r8em-tabbar').hide();
        }
    }

    function fillPayment(data) {
        View.fillPayment(data);
    }

    function clearFields() {
        $('#appointment_amount').val('');
        $('#payment_method').val('');
        $('#notes').val('');
    }

    return {
        init: init
    };
});