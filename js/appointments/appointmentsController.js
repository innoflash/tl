define(["app", "js/appointments/appointmentsView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [];

    function init() {
        app.f7.closePanel(true);
        loadAppointments();
        View.render({
            bindings: bindings
        });
    }

    function loadAppointments() {
        localStorage.removeItem(strings.clients);
        databaseHandler.getAppointments(fillAppointments);
        databaseHandler.getClientsAppointment();
    }

    function fillAppointments(rows) {
        if (rows.length == 0) {
            View.showBlank();
        } else {
            View.fillAppointments(rows);
        }
    }

    return {
        init: init
    };
});