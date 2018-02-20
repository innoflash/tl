$(document).on('ready', function (e) {
    console.log('on device ready called');
    databaseHandler.createDatabase(databaseDetails.name, databaseDetails.version, databaseDetails.displayName);

});