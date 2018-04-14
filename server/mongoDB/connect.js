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
 * For our express server, this means putting it in app.locals when our application starts
 *
 * @param dbName {String} - Name of the database to connect into
 * @param auth {Object} - Authentication options
 * @param auth.authUsr {String} - Name of the user connecting to the database
 * @param auth.authPwd {String} - Password of the user connecting to the database
 *
 * @return {MongoClient.db} - A database instance sharing current socket connections
 * */
async function createConnection(dbName, auth) {
    try {
        // Instantiate connection and return the database instance
        const connectionURL = `${baseURL}${auth.authUsr}:${auth.authPwd}@${host}:${port}/
        ${dbName}?authSource=${authSrc}`;

        const client = await MongoClient.connect(connectionURL);
        console.log(`Successfully connected to mongodb ${dbName}`);

        return client.db(dbName)
    }
    catch (e) {
        console.log(`Error when connecting to mongodb: ${e.message}`);
        return e
    }
}

module.exports = {
    createConnection: createConnection
};