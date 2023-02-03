const express = require('express')
const indexController = require('../controller/controller')
const router = express.Router()

router.get('/perfil', indexController.getPerfil)
router.post('/registrarse', indexController.postRegistrarse)
router.post('/login', indexController.postLogin)

module.exports = router