import jwt from 'jsonwebtoken';

const checkAuth = (role) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, 'blackpearl');
            const userRole = decodedData.role;
            if (role.includes(userRole)) {
                req.user = decodedData;
                next();
            } else {
                res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized Access!' });
        }
    }
}

export default checkAuth;
