const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ error: 'Unauthorized access' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details to the request
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};


exports.verifyAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

