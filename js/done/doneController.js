define(["app", "js/done/doneView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;
    var page = 1;

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
        databaseHandler.getDoneAppointments(fillAppointments, page);
        databaseHandler.getClientsAppointment();

    }

    function fillAppointments(rows) {
        if (rows.length == 0) {
            View.showBlank();
        } else {
            if (page == 1) {
                View.fillAppointments(rows);
            }else{
                View.appendAppointments(rows);
            }

            $('*#loadMoreApps').on('click', function () {
                $(this).unbind();
                page = page + 1;
                console.log(page);
                loadAppointments();
            });
        }
    }

    return {
        init: init
    };
});