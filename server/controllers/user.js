const pool = require("../index");
const res = require("express/lib/response");

async function getOneUser(req, res) {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM public.users WHERE id = $1', [id]);
        if (rows.length > 0) {
            return res.json({userObject: {id: rows[0].id, name: rows[0].name}});
        } else {
            return res.status(404).send({message: 'Utilisateur non trouvé'});
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Erreur lors de la récupération de l\'utilisateur'});
    }
}
async function getOneUserName(id) {
    try {

        const {rows} = await pool.query('SELECT * FROM public.users WHERE id = $1', [id]);
        if (rows.length > 0) {
            return rows[0].name;
        } else {
           return null;
        }
    } catch (err) {
      return null;  }
}


async function login(req, res) {
    try {
        const {username} = req.body;
        console.log('username :', username)
        const {rows} = await pool.query('SELECT * FROM public.users WHERE name = $1', [username]);
        if (rows.length > 0) {
            return res.json({userObject: {id: rows[0].id, name: rows[0].name}});
        }
        return res.json(null);

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Erreur lors de la récupération de l\'utilisateur'});
    }
}

async function register(req, res) {

    try {
        const {username} = req.body;
        const {rows} = await pool.query('INSERT INTO public.users (name) VALUES( $1) RETURNING *', [username]);
        return res.json({userObject: {id: rows[0].id, name: rows[0].name}});

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Erreur lors de la récupération de l\'utilisateur'});
    }

}
async function deleteUser(id){
    try{
        const {} = await pool.query('DELETE FROM public.users WHERE id = $1', [id]);
        return true
    }catch(err){
        console.error(err);
    }
}
module.exports = {getOneUser, login, register, getOneUserName,deleteUser};