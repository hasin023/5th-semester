const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const { crudToken } = req.cookies;

    if (crudToken) {
        try {
            const decodedToken = await jwt.verify(crudToken, '55VoicesInMyHead');
            req.userInfo = decodedToken;
            next();

        } catch (error) {
            return res.status(401).redirect('/login');
        }
    } else {
        return res.status(401).redirect('/login');
    }
}

module.exports = authMiddleware;