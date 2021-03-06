
'use strict';
var crypto = require('crypto');
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
}


function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
}

module.exports = {


        verifyPassword: function (password, salt){
            var passwordData = sha512(password, salt);
            return {
               passwordData
            };
    
        },

        saltHashPassword: function (userpassword) {
        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = sha512(userpassword, salt);
        console.log('UserPassword = ' + userpassword);
        console.log('Passwordhash = ' + passwordData.passwordHash);
        console.log('nSalt = ' + passwordData.salt);
        return {
           passwordData
        };

    }
}