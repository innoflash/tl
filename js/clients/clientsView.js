define(['hbs!js/clients/blank', 'hbs!js/clients/clients'], function (blankTemplate, clientsTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    function showBlank() {
        $('#clients').html(blankTemplate);
    }

    function fillClients(data) {
        $('#clients').html(clientsTemplate(data));
    }

    return {
        render: render,
        showBlank: showBlank,
        fillClients: fillClients
    };
});

