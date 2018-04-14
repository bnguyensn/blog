'use strict';

const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Hash a plain text password
 * @param pwd {String} - The plain text password to be hashed
 * @return {String} - The hashed password
 * */
async function hashPwd(pwd) {
    try {
        return await bcrypt.hash(pwd, saltRounds);
    }
    catch (e) {
        return e
    }
}

/**
 * Compare a plain text password with a hash
 * @param pwd {String} - The plain text password to be compared
 * @param hash {String} - The hash in the database to be compared with the plain text password
 * @return {Boolean} - TRUE if pwd === hash, else FALSE
 * */
async function checkPwd(pwd, hash) {
    try {
        return await bcrypt.compare(pwd, hash);
    }
    catch (e) {
        return e
    }
}

module.exports = {
    hashPwd: hashPwd,
    checkPwd: checkPwd
};