define(['hbs!js/client/basic', 'hbs!js/client/appointments', 'hbs!js/done/blank'], function (basicTemplate, appointmentsTemplate, blankTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillImage() {
        $('#client_image').attr('src', mulungu[Math.floor(Math.random() * (mulungu.length + 1))]);
    }

    function fillBasic(data) {
        $('#basic_details').html(basicTemplate(data));
    }

    function fillAppointments(data) {
        $('#appointments').html(appointmentsTemplate(data));
    }

    function showBlank() {
        $('#appointments').html(blankTemplate);
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillImage: fillImage,
        fillBasic: fillBasic,
        fillAppointments: fillAppointments,
        showBlank: showBlank
    };
});

