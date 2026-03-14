const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken =  (req, res, next) => {
    // Bypass verification for demonstration
    req.user = { role: 'admin' };
    next();

}

module.exports = verifyAdminToken;