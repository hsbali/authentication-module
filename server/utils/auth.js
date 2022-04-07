const jwt = require("jsonwebtoken");

function getAccessToken(user, type) {
    try {
        if (!type) throw "User Type is not defined"
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000 + 60 * 20),
                data: {
                    user: {
                        id: user.id,
                        type
                    },
                },
            },
            process.env.ACCESS_TOKEN_JWT
        );   
    } catch (err) {
        console.log(err)
        return null
    }
}

function getRefreshToken(user, type) {
    try {
        if (!type) throw "User Type is not defined"
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000 + 60 * 60 * 169),
                data: {
                    user: {
                        id: user.id,
                        type
                    }
                },
            },
            process.env.REFRESH_TOKEN_JWT
        );
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = {
    getAccessToken,
    getRefreshToken
}