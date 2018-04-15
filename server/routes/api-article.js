/** ********* API - USER ROUTE ********* **/

const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * Route to create a new article
 * */
router.post('/create-new-article', async (req, res, next) => {
    try {


    }
    catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;