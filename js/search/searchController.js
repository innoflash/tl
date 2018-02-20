define(["app", "js/search/searchView"], function (app, View) {
    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [];

    function init() {

        View.render({
            bindings: bindings
        });
    }


    return {
        init: init
    };
});