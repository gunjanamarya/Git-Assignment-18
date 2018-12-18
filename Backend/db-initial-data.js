var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
});

con.connect(function (err) {
    if (err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS `e-mart`", function (err, result) {
        if (err) throw err;
    });
    con.end();
    con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'e-mart'
    });
    con.query("CREATE TABLE IF NOT EXISTS `users` ( `username` VARCHAR(50) NOT NULL, `password` VARCHAR(50) NOT NULL, PRIMARY KEY(`username`, `password`))", function (err, result) {
        if (err) throw err;
        var users = [
            ['test1', 'happy'],
            ['test2', 'happy'],
        ]
        con.query("INSERT INTO `users`(username,password) VALUES ?", [users], function (err, result) {
            if (err) throw err;
            con.query("CREATE TABLE IF NOT EXISTS `orders` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `username` VARCHAR(50) NOT NULL, `cart` VARCHAR(500) NOT NULL, `amount_spent` INT UNSIGNED NOT NULL, purchase_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `order_status` VARCHAR(20) NOT NULL, PRIMARY KEY(`id`))", function (err, result) {
                if (err) throw err;
                con.end();
            });
        });
    });
});