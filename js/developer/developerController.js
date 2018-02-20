define(["app", "js/developer/developerView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [];

    function init() {
        app.f7.closePanel(true);
        View.render({
            bindings: bindings
        });
    }

    return {
        init: init
    };
});