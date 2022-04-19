import { verify } from 'jsonwebtoken';





export function checkToken(req, res, next) {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    verify(token, process.env.SECRET_KEY_GESTIONNAIRE, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        // cet utilisateur est bien authentifié
        req.userId = decoded.id;
        next();
    });
}