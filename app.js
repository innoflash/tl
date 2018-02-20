require.config({
    paths: {
        handlebars: "lib/handlebars-v4.0.11",
        config: 'js/config',
        hbshelper: "js/hbshelper",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app', ['js/router'], function (Router) {
    Router.init();
    Router.reinit();

    var f7 = new Framework7({
        modalTitle: 'Talent Lashes',
        animateNavBackIcon: true,
        pushState: true,
        swipePanel: 'left',
        text: 'go up',
        ignorePages: ['index'] // defaults to []
    });
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
    return {
        f7: f7,
        mainView: mainView,
        router: Router,
    };
});