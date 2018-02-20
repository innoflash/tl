define(['hbs!js/appointment/appointment', 'hbs!js/appointment/payment'], function (appointmentTemplate, paymentTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillImage() {
        $('#appointment_image').attr('src', talent[Math.floor(Math.random() * (talent.length + 1))]);
    }

    function fillAppointment(data) {
        $('#appointment').html(appointmentTemplate(data));
    }

    function fillPayment(data) {
        $('#payment').html(paymentTemplate(data));
    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillImage: fillImage,
        fillAppointment: fillAppointment,
        fillPayment: fillPayment
    };
});

