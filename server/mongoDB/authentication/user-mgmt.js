'use strict';

const app = require('../../../app');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const pwdMgmt = require('./pwd-mgmt');

const COLL_USERS = 'users';
const JWT_SECRET = process.env.BLOG_DB_JWT_SECRET;

/**
 * Create a new unique user
 *
 * @param username {String} - The username to be created
 * @param pwd {String} - The associated password
 *
 * @return {String} - The newly created user's ID
 * */
async function createUser(username, pwd) {
    try {
        const dbUsers = app.locals.mongoDBUsers;
        const coll = dbUsers.collection(COLL_USERS);

        // Check for duplicate user
        const duplicateUsername = await coll.findOne({username: username});
        if (duplicateUsername !== null) {
            return new Error('Username already exists')
        }

        // Add user if no duplicate
        const hashedPwd = await pwdMgmt.hashPwd(pwd);
        return await coll.insertOne({username: username, pwd: hashedPwd}).insertedId.id;
    }
    catch (e) {
        return e
    }
}

/**
 * Normal log in using username and password
 * If user credentials are correct, will return a JWT for cookie purposes
 * */
async function login(username, pwd) {
    try {
        const dbUsers = app.locals.mongoDBUsers;
        const coll = dbUsers.collection(COLL_USERS);

        const user = await coll.findOne({username: username});
        if (!user || !pwdMgmt.checkPwd(pwd, user.pwd)) {

            // User does not exist / password does not match
            return new Error('Incorrect user credentials');
        }

        // User credentials valid, create a signed token
        const payload = {userId: user._id};  // a.k.a. "claims"
        return jwt.sign(payload, JWT_SECRET, {algorithm: 'HS256', expiresIn: '30d'})
    }
    catch (e) {
        return e
    }
}

/**
 * Log in using cookie
 * */
async function loginToken(token) {
    try {

        // Decode token & verify signature
        const decodedUserId = jwt.verify(token, JWT_SECRET).userId;

        // Check if user exists
        const dbUsers = app.locals.mongoDBUsers;
        const coll = dbUsers.collection(COLL_USERS);

        const userExist = await coll.findOne({_id: ObjectId(decodedUserId)});
        if (!userExist) {
            return new Error('Invalid token: user not found');
        }

        return true
    }
    catch (e) {
        return e
    }
}

/**
 * Exports
 * */

module.exports = {
    createUser: createUser,
    login: login,
    loginToken: loginToken
};