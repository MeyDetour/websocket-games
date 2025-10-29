const {Router} = require("express");
const router = Router();
const pool = require('../index');
const {getOneUser, login, register} = require("../controllers/user");


pool.query('SELECT NOW()', [])
    .then(() => {
        console.log('Connexion réussie à la base de données PostgreSQL');
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données PostgreSQL', err);
    });


router.get('/user/:id', getOneUser)


router.post('/login', login)

router.post('/register', register)


module.exports = router;