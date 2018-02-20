define([], function () {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillImage() {
        $('#client_image').attr('src', talent[Math.floor(Math.random() * (talent.length + 1))]);
        $('#client_image').attr('src', mulungu[Math.floor(Math.random() * (mulungu.length + 1))]);
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillImage: fillImage
    };
});

