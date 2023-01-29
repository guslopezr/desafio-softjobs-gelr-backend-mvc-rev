const express = require('express')
const indexController = require('../controller/controller')
const router = express.Router()

router.get('/usuarios', indexController.getPerfil) // estas rutas están en el fronted, por ende se respetan, o se cambian en el front tambien
router.post('/usuarios', indexController.postRegistrarse) // idem
router.post('/login', indexController.postLogin)

module.exports = router