define(["app", "js/index/indexView"], function (app, View) {

    var $ = jQuery;
    var $$ = Dom7;

    var bindings = [
        {
            element: '#linkHome',
            event: 'click',
            handler: loadHome
        }, {
            element: '#inviteOthers',
            event: 'click',
            handler: inviteOthers
        }
    ];

    function init() {
        View.fillImage();
        $('#indexPage').show();
        View.render({
            bindings: bindings
        });
    }

    function reinit() {
        console.log('reinit from index controller');
    }



    function loadHome() {

    }

    function inviteOthers() {

    }


    return {
        init: init,
        reinit: reinit
    };
});