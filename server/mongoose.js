const mongoose = require('mongoose');
const mongodUri = 'mongodb://localhost:27017/messagerieexpress';

async function connectToDatabase() {
    try {
        await mongoose.connect(mongodUri, {});
        console.log('Connexion à MongoDB réussie');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB', error);
        process.exit(1); // Quitte l'application si la connexion échoue
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connecté');
});

mongoose.connection.on('error', (err) => {
    console.error('Erreur de connexion Mongoose :', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose déconnecté');
});

module.exports = connectToDatabase;
