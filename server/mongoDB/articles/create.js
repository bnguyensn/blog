'use strict';

const app = require('../../../app');
const ObjectId = require('mongodb').ObjectId;

const Entities = require('html-entities').XmlEntities;  // Encode / decode HTML characters

const COLL_ARTICLES = 'articles';

const entities = new Entities();

async function storeArticle(data) {
    try {
        const dbArticles = app.locals.mongoDBArticles;
        const coll = dbArticles.collection(COLL_ARTICLES);

        // Sanitise the article
        // We check all data entries that contain string values
        data.author = entities.encode(data.author);
        data.title = entities.encode(data.title);
        data.content = entities.encode(data.content);
        data.slug = entities.encode(data.slug);
        for (let i = 0; i < data.tags.length; i++) {
            data.tags[i] = entities.encode(data.tags[i]);
        }

        // Insert the sanitised article
        const r = await coll.insertOne(data);
        console.log(`Successfully inserted article as ID = ${r.insertedId}`);
    }
    catch (e) {
        return e
    }
}

module.exports = {
    storeArticle: storeArticle
};