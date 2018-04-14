/** ********* INDEX ROUTE ********* **/

const express = require('express');
const router = express.Router();
const path = require('path');

const users = require('../blog/authentication/users');

router.get('/', async (req, res, next) => {

    // Check cookie for login token which should be stored under the name "logininfo"
    try {
        const tokenValid = await users.loginToken(req.signedCookies.logininfo);

        const htmlOptions = {
            root: path.join(__dirname, '../../dist'),
            maxAge: 31536000
        };

        if (tokenValid instanceof Error) {

            // Invalid token - show login page
            res.status(200).sendFile('login.html', htmlOptions, (err) => {
                next(err);
            });
        } else {

            // Valid token - show dashboard page
            res.status(200).sendFile('dashboard.html', htmlOptions, (err) => {
                next(err);
            });
        }
    }
    catch (e) {
        res.status(500).send(e.message);
        next(e);
    }
});

module.exports = router;