'use strict';

/**
 * Handle mongoDB connection
 * NOTE: Important database variables should be specified in the .env file
 * */

const MongoClient = require('mongodb').MongoClient;

const baseURL = process.env.BLOG_DB_BASE_URI;
const host = process.env.BLOG_DB_HOST;
const port = process.env.BLOG_DB_PORT;
const authSrc = process.env.BLOG_DB_AUTH_SRC;

/**
 * We should reuse the client object returned by this function
 * For our express server, this means putting it into app.locals
 * */
async function connect(db_name, auth_opt) {
    try {
        // Instantiate connection and return the database instance
        const connectionURL = `${baseURL}${auth_opt.AUTH_USR}:${auth_opt.AUTH_PWD}@${host}:${port}/
        ${db_name}?authSource=${authSrc}`;

        const client = await MongoClient.connect(connectionURL);
        console.log(`Successfully connected to mongodb ${db_name}`);

        return client
    }
    catch (e) {
        console.log(`Error when connecting to mongodb: ${e.message}`);
        return e
    }
}

module.exports = {
    connect: connect
};