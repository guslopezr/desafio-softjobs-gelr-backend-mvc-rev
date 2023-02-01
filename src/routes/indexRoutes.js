const express = require('express')
const indexController = require('../controller/controller')
const router = express.Router()

router.get('/perfil', indexController.getPerfil) // estas rutas están en el fronted, por ende se respetan, o se cambian en el front tambien
router.post('/registrarse', indexController.postRegistrarse) // idem
router.post('/login', indexController.postLogin)

module.exports = router