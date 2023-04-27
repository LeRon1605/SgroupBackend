import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const fileName = fileURLToPath(import.meta.url);

export default (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'No token provided.'
        });
    } else {
        try {
            const claims = jwt.verify(token, fs.readFileSync(path.join(fileName, '../../shared/secret/public-key.pem')), process.env.JWT_SECRET);
            req.session = claims;
            next();
        } catch (err) {
            return res.status(401).json({
                message: 'Invalid token.'
            })
        }
    }
}