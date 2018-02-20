$(document).ready(function (e) {
    $.fn.fieldsValid = function (validate_user_fields, app, type) {
        $string = new Array();
        $error_msg = '';
        var y = 0;
        for ($x = 0; $x < validate_user_fields.length; $x++) {
            if (validate_user_fields[$x].val().length == 0) {
                $string.push(validate_user_fields[$x]);
                $error_msg += validate_user_fields[$x].attr('placeholder') + " can`t be blank<br/>";
            }
        }
        if ($string.length == 0) {
            return true;
        } else {
            if (type === undefined) {
                app.f7.addNotification({
                    title: 'Talent Lashes',
                    message: $error_msg
                });
            } else {
                app.f7.alert($error_msg);
            }
            return false;
        }
    }
});