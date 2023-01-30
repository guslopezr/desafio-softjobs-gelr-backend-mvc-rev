estructura de las carpetas de back end

main / src
OK controller: consultas.js o similar. Por ejemplo "methodControler"
ok database: conexión a la base de datos
routes: index routes y methodRoutes, ver https://github.com/guslopezr/likeme-parte2/tree/master/src/routes 
ok services: indexServices, ver ejemplo en https://github.com/guslopezr/likeme-parte2/tree/master/src/services

Importar indexServices en controller
Exportar "methodController" a indexController (???)
importarlo en indexRoutes, desde acá importarlo a App
en App importarlo  const indexRoutes = require('./src/routes/indexRoutes') 


RUTAS DE PRUEBA:


http://localhost:3000/

router.get('/usuarios', indexController.getPerfil) // estas rutas están en el fronted, por ende se respetan, o se cambian en el front tambien

router.post('/usuarios', indexController.postRegistrarse) // idem
router.post('/login', indexController.postLogin)



POST
http://localhost:3000/usuarios   (Crear)

GET
http://localhost:3000/usuarios (ver)

POST
http://localhost:3000/login (acceso)


{
  "email": "guslopezr@gmail.com",
  "password": "112233",
  "rol": "FullStack Developer",
  "lenguage": "Javascript"
}

$2a$10$1.3.AjIy5JKlYuD91B/jNeYhN4gx.sQeJ2Rku0twnbpkjT/3t6REq


{
  "email": "juanpeluca@gmail.com",
  "password": "developer1",
  "rol": "FullStack Developer",
  "lenguage": "Javascript"
}

{
  "email": "rogelioaguas@gmail.com",
  "password": "thewall1979",
  "rol": "Backend Developer",
  "lenguage": "Python"
}

{
  "email": "nicolas@gmail.com",
  "password": "developer4",
  "rol": "Backend Developer",
  "lenguage": "Python"
}