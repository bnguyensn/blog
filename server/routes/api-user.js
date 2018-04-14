/** ********* API - USER ROUTE ********* **/

const express = require('express');
const router = express.Router();
const path = require('path');

const userMgmt = require('../mongoDB/authentication/user-mgmt');

/**
 * Route to create a new user
 * */
router.post('/create-new-user', async (req, res, next) => {
    try {
        const insertedUserId = userMgmt.createUser(req.body.username, req.body.pwd);

        if (insertedUserId instanceof Error) {

            // Error when creating user
            res.status(500).send(insertedUserId.message);
        } else {

            // User creation succeed
            res.status(200).send(insertedUserId);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * Route to log in
 * If success, will return a JWT
 * */
router.post('/login', async (req, res, next) => {
    try {
        const jwt = await userMgmt.login(req.body.username, req.body.pwd);

        if (jwt instanceof Error) {

            // Error when logging in
            res.status(400).send(jwt.message);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;