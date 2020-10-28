const admin = require('firebase-admin');
let claveConfig = require('../clave.json');

admin.initializeApp({
    credential: admin.credential.cert(claveConfig)
})


const db = admin.firestore();

module.exports = db;