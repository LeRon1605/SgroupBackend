import crypto from 'crypto';

const rawPassword = 'leron1605';

function hash(input) {
    return crypto.createHash('sha512').update(input).digest('hex');
}

function hashWithRandomSalt(input) {
    const salt = crypto.randomBytes(16).toString('hex');
    // console.log(salt)
    return crypto.pbkdf2Sync(input, salt, 1000, 64, 'sha512').toString('hex');
}

const key = crypto.generateKeyPairSync(
    'rsa',
    { modulusLength: 2048 }  
);

const publicKey = key.publicKey;
const privateKey = key.privateKey;

const encryptedData = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    Buffer.from(rawPassword)
).toString('base64');

const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    Buffer.from(encryptedData, 'base64')
).toString();

console.log(hash(rawPassword));
console.log(hashWithRandomSalt(rawPassword));
console.log(encryptedData);
console.log(decryptedData);