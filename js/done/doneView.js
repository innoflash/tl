define(['hbs!js/done/blank', 'hbs!js/done/appointments'], function (blankTemplate, appointmentsTemplate) {
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
        $('#appointments').html(blankTemplate);
    }

    function fillAppointments(data) {
        $('#appointments').html(appointmentsTemplate(data));
    }

    return {
        render: render,
        showBlank: showBlank,
        fillAppointments: fillAppointments
    };
});

