var databaseHandler = {
    db: null,
    createDatabase: function (dbname, version, display_name) {
        this.db = window.openDatabase(dbname, version, display_name, 100000000);
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "CREATE TABLE IF NOT EXISTS clients (_id INTEGER PRIMARY KEY, name VARCHAR(30) UNIQUE, number VARCHAR(255) UNIQUE)",
                    [],
                    function (transaction, resultSet) {
                        console.log('clients table created');
                        console.log(resultSet);
                    },
                    function (transaction, error) {
                        console.log("Error when creating table : " + error.message)
                    }
                );
                transaction.executeSql(
                    "CREATE TABLE IF NOT EXISTS appointments (_id INTEGER PRIMARY KEY , client_id INTEGER, _date DATE, _time VARCHAR(5), _type VARCHAR(35), _completed BOOLEAN, _active BOOLEAN,  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE)",
                    [],
                    function (transaction, resultSet) {
                        console.log('appointments table created');
                        console.log(resultSet);
                    },
                    function (transaction, error) {
                        console.log("Error when creating table : " + error.message)
                    }
                );
                transaction.executeSql(
                    "CREATE TABLE IF NOT EXISTS payments (_id INTEGER PRIMARY KEY , appointment_id INTEGER UNIQUE, _amount INTEGER, _type VARCHAR(5), _notes TEXT,  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE)",
                    [],
                    function (transaction, resultSet) {
                        console.log('payments table created');
                        console.log(resultSet);
                    },
                    function (transaction, error) {
                        console.log("Error when creating table : " + error.message)
                    }
                );
            },
            function (error) {
                console.log('Error :' + error.message);
            },
            function () {
                console.log("Database has been created");
            }
        );
    },
    addClient: function (app, name, number) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "INSERT INTO clients (name, number) VALUES (?, ?)",
                    [
                        name,
                        number
                    ],
                    function (transaction, resultSet) {
                        app.f7.addNotification({
                            title: 'Client status',
                            message: name + ' has been added to the clients database'
                        });
                        app.mainView.router.back({
                            url: 'pages/clients.html',
                            force: true,
                            ignoreCache: true
                        });
                        console.log(name + ' has been added to the clients database');
                    },
                    function (transaction, error) {
                        app.f7.alert('A user with this number already exists, you must have added ' + name + ' already!!');
                        return false;
                    }
                );
            },
            function (error) {
                console.log(error.message);
            },
            function () {

            }
        );
    },
    addAppointment: function (app, _id, date, time, type) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "INSERT INTO appointments (client_id, _date, _time, _type, _completed, _active) VALUES (?, ?, ?, ?, ?, ?)",
                    [
                        _id,
                        date,
                        time,
                        type,
                        false,
                        true
                    ],
                    function (transaction, resultSet) {
                        app.f7.addNotification({
                            title: 'Appointment status',
                            message: 'Appointment has been added successfully'
                        });
                        app.mainView.router.back({
                            url: 'pages/appointments.html',
                            force: true,
                            ignoreCache: true
                        });
                        console.log('Appointment has been added successfully');
                    },
                    function (transaction, error) {
                        app.f7.alert('Failed to add this appointment');
                        return false;
                    }
                );
            },
            function (error) {
                console.log(error.message);
            },
            function () {

            }
        );
    },
    addPayment: function (app, appointment_id, amount, method, notes, clearFields) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "INSERT INTO payments (appointment_id, _amount, _type, _notes) VALUES (?, ?, ?, ?)",
                    [
                        appointment_id,
                        amount,
                        method,
                        notes
                    ],
                    function (transaction, resultSet) {
                        transaction.executeSql("UPDATE appointments SET _completed = ? WHERE _id = ?",
                            [
                                true,
                                appointment_id
                            ], function (transaction2, resultSet2) {
                                clearFields();
                                app.f7.closeModal('.popup-finish');
                                app.mainView.router.back({
                                    url: 'pages/appointments.html',
                                    force: true,
                                    ignoreCache: true
                                });
                                app.f7.addNotification({
                                    title: 'Appointment status',
                                    message: 'Appointment has been finished successfully'
                                });
                            }, function (transaction2, error) {
                                console.log(error.message);
                            });
                    },
                    function (transaction, error) {
                        console.log(error.message);
                        app.f7.alert(error.message);
                        return false;
                    }
                );
            },
            function (error) {
                console.log(error.message);
            },
            function () {

            }
        );
    },
    getClients: function (fillClients) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT * FROM clients ORDER BY name ASC",
                    [],
                    function (transaction, resultSet) {
                        console.log(resultSet);
                        console.log(resultSet.rows);
                        fillClients(resultSet.rows);
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getAppointments: function (fillAppointments) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT appointments._id, _date, _time, name FROM appointments LEFT JOIN clients ON appointments.client_id = clients._id WHERE _completed = ? AND _active = ? ORDER BY appointments._date ASC, appointments._time ASC",
                    [
                        false,
                        true
                    ],
                    function (transaction, resultSet) {
                        console.log(resultSet.rows);
                        fillAppointments(resultSet.rows);
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getDoneAppointments: function (fillAppointments) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT appointments._id, _date, _time, name FROM appointments LEFT JOIN clients ON appointments.client_id = clients._id WHERE _completed = ? AND _active = ? ORDER BY appointments._date ASC, appointments._time ASC",
                    [
                        true,
                        true
                    ],
                    function (transaction, resultSet) {
                        console.log(resultSet.rows);
                        fillAppointments(resultSet.rows);
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getClientsAppointment: function () {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT * FROM clients ORDER BY name ASC",
                    [],
                    function (transaction, resultSet) {
                        console.log(resultSet);
                        localStorage.setItem(strings.clients, JSON.stringify(resultSet.rows));
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getClient: function (app, name, plusAppointment) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT * FROM clients WHERE name = ?",
                    [
                        name
                    ],
                    function (transaction, resultSet) {
                        if (resultSet.rows.length == 0) {
                            app.f7.alert('You are trying to book a client you haven`t registered yet, see to it that you register her first');
                        } else {
                            console.log(resultSet.rows[0]._id);
                            plusAppointment(resultSet.rows[0]);
                        }
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getClientByID: function (app, id, fillClient) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT * FROM clients WHERE _id = ?",
                    [
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log(resultSet);
                        if (resultSet.rows.length == 0) {
                            app.f7.alert('You are trying to book a client you haven`t registered yet, see to it that you register her first');
                        } else {
                            fillClient(resultSet.rows[0]);
                        }
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getAppointment: function (id, fillAppointment) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT * FROM appointments INNER JOIN clients ON appointments.client_id = clients._id WHERE appointments._id = ?",
                    [
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log(resultSet.rows);
                        fillAppointment(resultSet.rows[0]);
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getClientAppointments: function (id, fillAppointments) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT appointments._id, name, _date, _time, _completed FROM appointments INNER JOIN clients ON appointments.client_id = clients._id WHERE clients._id = ?",
                    [
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log(resultSet.rows);
                        fillAppointments(resultSet.rows);
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    getPayment: function (id, fillPayment) {
        this.db.readTransaction(
            function (transaction) {
                transaction.executeSql(
                    "SELECT * FROM payments WHERE appointment_id = ?",
                    [
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log(resultSet.rows);
                        fillPayment(resultSet.rows[0]);
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            }, function (error) {
                console.log(error.message);
            }, function () {

            }
        );
    },
    cancelAppointment: function (app, id) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "UPDATE appointments SET _active = ? WHERE _id = ?",
                    [
                        false,
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log('appointment cancelled');
                        app.f7.addNotification({
                            title: 'Appointment status',
                            message: 'Appointment has been cancelled successfully'
                        });
                        app.mainView.router.back({
                            url: 'pages/appointments.html',
                            force: true,
                            ignoreCache: true
                        });
                    },
                    function (transaction, error) {
                        console.log('appointment cancelling failed');
                    }
                );
            },
            function (error) {
                console.log('failed to cancel appointment');
            },
            function () {

            }
        );
    },
    editAppointment: function (app, id, date, time, type) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "UPDATE appointments SET _date = ?, _time = ?, _type = ? WHERE _id = ?",
                    [
                        date,
                        time,
                        type,
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log('appointment edited');
                        app.f7.addNotification({
                            title: 'Appointment status',
                            message: 'Appointment has been changed successfully'
                        });
                        app.mainView.router.back({
                            url: 'pages/appointments.html',
                            force: true,
                            ignoreCache: true
                        });
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            },
            function (error) {
                console.log(error.message);
            },
            function () {

            }
        );
    },
    deleteClient: function (app, client_id) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "DELETE FROM clients WHERE _id = ?",
                    [
                        client_id
                    ],
                    function (transaction, resultSet) {
                        app.f7.addNotification({
                            title: 'Client status',
                            message: 'Client has been deleted from the clients database'
                        });
                        app.mainView.router.back({
                            url: 'pages/clients.html',
                            force: true,
                            ignoreCache: true
                        });
                        console.log('has been deleted from the clients database');
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            },
            function (error) {
                console.log(error.message);
            },
            function () {
                console.log('delete transaction open');
            }
        );
    },
    updateClient: function (app, id, name, number) {
        this.db.transaction(
            function (transaction) {
                transaction.executeSql(
                    "UPDATE clients SET name = ?, number = ? WHERE _id = ?",
                    [
                        name,
                        number,
                        id
                    ],
                    function (transaction, resultSet) {
                        console.log('client edited');
                        app.f7.addNotification({
                            title: 'Client status',
                            message: 'Client has been updated successfully'
                        });
                        app.mainView.router.back({
                            url: 'pages/clients.html',
                            force: true,
                            ignoreCache: true
                        });
                    },
                    function (transaction, error) {
                        console.log(error.message);
                    }
                );
            },
            function (error) {
                console.log(error.message);
            },
            function () {

            }
        );
    }
};