define(['hbs!js/editclient/client'], function (clientTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillImage() {
        $('#client_image').attr('src', mulungu[Math.floor(Math.random() * (mulungu.length + 1))]);
    }

    function fillClient(data) {
        $('#clientDetails').html(clientTemplate(data));
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillImage: fillImage,
        fillClient: fillClient
    };
});

