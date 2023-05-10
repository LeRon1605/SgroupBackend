import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const payload = {
    id: 102200190
};

const { privateKey, publicKey } = crypto.generateKeyPairSync(
    'rsa',
    { modulusLength: 2048 }  
);

const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256'
});

const result = jwt.verify(token, publicKey,  { algorithm: 'RS256'});

console.log(privateKey, publicKey);
console.log(token);
console.log(result);