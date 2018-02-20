define(['hbs!js/editappointment/appointment'], function (appointmentTemplate) {
    var $$ = Dom7;
    var $ = jQuery;

    function render(params) {
        bindEvents(params.bindings);
    }

    function fillImage() {
        $('#client_image').attr('src', mulungu[Math.floor(Math.random() * (mulungu.length + 1))]);
    }

    function fillAppointment(data) {
        $('#details').html(appointmentTemplate(data));
    }


    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: render,
        fillImage: fillImage,
        fillAppointment: fillAppointment
    };
});

