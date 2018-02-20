define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });
    Handlebars.registerHelper('changedate', function (date) {
        theDate = Date.parse(date).toString();
        zeroIndex = theDate.indexOf('00:00');
        return theDate.substring(0, zeroIndex) + " ";
    });
    Handlebars.registerHelper('changeimage', function () {
        var lashes = [
            'img/lashes/lash1.jpg',
            'img/lashes/lash2.jpg',
            'img/lashes/lash3.jpg',
            'img/lashes/lash4.jpg',
            'img/lashes/lash5.jpg'
        ];
        return lashes[Math.floor(Math.random() * (lashes.length + 1))]
    });

    Handlebars.registerHelper('checkdate', function (date) {
        var tdy = Date.today();
        var day = Date.parse(date);
        if (tdy.compareTo(day) == 0) {
            return 'today';
        }
    });

    Handlebars.registerHelper('checkdone', function (date, completed) {
        var tdy = Date.today();
        var day = Date.parse(date);

        if (completed) {
            console.log('done');
            return 'done';
        } else {
            console.log('today');
            if (tdy.compareTo(day) == 0) {
                return 'today';
            }
        }
    });
});
