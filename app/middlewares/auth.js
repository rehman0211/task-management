const AUTH_TOKEN = 'd2he3qb3g7rprsbfebfhyq73r';

async function verifyUser(req, res, next) {
    const clientIp = req.ip;
    try {
        const accessToken = (req.headers['authorization'] || req.headers['Authorization']) || undefined;
        if (!accessToken) {
            return res.status(401).send('Token Not Provided');
        }
        if(accessToken != AUTH_TOKEN) {
            return res.status(403).send('Invalid token provided');
        }

        // TODO://validate user using further authentication/authorization as per requirement...
        
        return next();
    } catch (error) {
        console.error({ error: error, clientIp: clientIp, reqUrl: req.url });
        return res.sendStatus(500);
    }
}

module.exports = {
    verifyUser
}