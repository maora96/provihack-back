const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        let decoded;

        if (token) {
            decoded = jwt.verify(token, "provihack")
            req.userId = decoded?.id; 
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { auth }