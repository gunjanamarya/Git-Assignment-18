var express = require('express');
var router = express.Router();
var passport = require('passport');
// var Task = require('../models/Tasks');
var db = require('../dbconnection');

router.post('/place-order', function (req, res, next) {

    var order = [
        [
            req.user.username,
            JSON.stringify(req.body.cart),
            req.body.amount_spent,
            req.body.order_status
        ]
    ]
    db.query("INSERT INTO orders(username,cart,amount_spent,order_status) VALUES ?", [order], function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });

});

router.put('/edit-order/:id', function (req, res, next) {

    db.query("UPDATE orders SET cart = ? , amount_spent = ? , purchase_timestamp = CURRENT_TIMESTAMP() WHERE id = ?", [JSON.stringify(req.body.cart), req.body.amount_spent, req.params.id], function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });

});

router.put('/update-status/:id', function (req, res, next) {

    db.query("UPDATE orders SET order_status = ? WHERE id = ?", ["approved", req.params.id], function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });

});

router.get('/get-order', function (req, res, next) {

    db.query("SELECT * FROM `orders` WHERE `username`= ? ORDER BY `purchase_timestamp` DESC", [req.user.username], function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });

});

router.get('/search-order/:id', function (req, res, next) {

    db.query("SELECT * FROM `orders` WHERE `id`= ?", [req.params.id], function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });

});

router.delete('/delete-order/:id', function (req, res, next) {

    db.query("DELETE FROM `orders` WHERE `id` = ?", +[req.params.id], function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });

});

router.post('/login', passport.authenticate('local', {
    failureFlash: true
}), function (req, res) {
    res.json({ 'username': req.user.username });
});

router.get('/logout', function (req, res) {
    // console.log(req.user)
    req.logOut();
    return res.json({ authenticated: req.isAuthenticated() });
});

module.exports = router;