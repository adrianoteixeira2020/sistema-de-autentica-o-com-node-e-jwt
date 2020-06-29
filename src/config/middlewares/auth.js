import jwt from 'jsonwebtoken';
import authConfig from '../auth.json'
import decode from 'jsonwebtoken/decode';

export default (req, res, next) => {
    const token = req.headers.authorization  

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)  return res.status(401).send({error: 'Token error!'})

        req.userId = decoded.id
        return next()
    })
}