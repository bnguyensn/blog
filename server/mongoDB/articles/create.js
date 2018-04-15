'use strict';

const app = require('../../../app');

async function createArticle(data) {
    try {
        const dbArticles = app.locals.mongoDBArticles;
    }
    catch (e) {
        return e
    }
}