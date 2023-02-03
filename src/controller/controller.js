const jwt = require("jsonwebtoken");
const { getUsuarios, registrarUsuario, verificarCredenciales } = require('../services/indexServices')


const indexController = {
    handleError: function(res, error) {
        res.status(error.code || 500).send(error)
    },

    getPerfil: async function(req, res) {
        try {
            const Authorization = req.header('Authorization')
            const token = Authorization.split('Bearer ')[1]
            jwt.verify(token, 'az_AZ')
            const { email } = jwt.decode(token)
            const usuarios = await getUsuarios(email)
            res.send(usuarios[0])
        } catch (error) {
            indexController.handleError(res, error)
        }
    },

    postRegistrarse: async function(req, res) {
        try {
            const usuario = req.body
            await registrarUsuario(usuario)
            res.send("Usuario creado con éxito")
        } catch (error) {
            indexController.handleError(res, error)
        }
    },

    postLogin: async function(req, res) {
        try {
            const { email, password } = req.body
            const token = jwt.sign({ email }, "az_AZ", { expiresIn: '1h' })
            await verificarCredenciales(email, password)
            res.send(token)
        } catch (error) {
            console.log(error)
            indexController.handleError(res, error.message)
        }
    }
}

module.exports = indexController;