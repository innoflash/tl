define(["app", "js/clients/clientsView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [];

    function init() {
        app.f7.closePanel(true);
        loadClients();
        View.render({
            bindings: bindings
        });
    }
    
    function loadClients() {
        databaseHandler.getClients(fillClients);
    }
    
    function fillClients(rows) {
        if (rows.length == 0) {
            View.showBlank();
        } else {
            View.fillClients(rows);
     /*       $('*#readButton').on('click', function () {
                var lighter_id = $(this).attr('lighter_id');
                var lighter_name = $(this).attr('lighter_name');
                app.mainView.router.loadPage('pages/lighter.html?id=' + lighter_id + '&name=' + lighter_name);
            });*/
        }
    }

    return {
        init: init
    };
});