const jwt = require("jsonwebtoken");
const { getUsuarios, registrarUsuario, verificarCredenciales } = require('../services/indexServices')

/*
//esto debería ir a la App.js
app.listen(3000, console.log("SERVIDOR ENCENDIDO"))
app.use(cors())
app.use(express.json())
*/

const indexController = {
    handleError: function(res, error) {
        res.status(error.code || 500).send(error)
    },

    getPerfil: async function(req, res) {
        try {
            const Authorization = req.header('Authorization') // aquí rescatamos el token completo de la cabezera
            const token = Authorization.split('Bearer ')[1] // con esto seleccionamos el cuerpo del token, omitiendo el codificado y la firma
            jwt.verify(token, 'az_AZ') // verificamos que el token no lo haya modificado el usuario
            const { email } = jwt.decode(token) // del cuerpo del token extraemos el email
            const usuarios = await getUsuarios(email) // llamamos la función y le pasamos el email extraído del token
            res.send(usuarios[0]) // te devuelve un objeto dentro de un array, por ende debes seleccionar el índice 0 [{}] que es el objeto que está adentro de los corchetes exteriores
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
            indexController.handleError(res, error.message) // el .message es para que te aparezca el mensaje error y no el cuepro entero
        }
    }
}

module.exports = indexController;





/* function handleError(res, error) {
    res.status(error.code || 500).send(error)
}

app.get("/perfil", async(req, res) => {
    try {
        const usuarios = await getUsuarios()
        res.json(usuarios)
    } catch (error) {
        handleError(res, error)
    }
})

app.post("/registrarse", async(req, res) => {
    try {
        const usuario = req.body
        await registrarUsuario(usuario)
        res.send("Usuario creado con éxito")
    } catch (error) {
        handleError(res, error)
    }
})

app.post("/login", async(req, res) => {
    try {

        const { email, password } = req.body
        const token = jwt.sign({ email }, "az_AZ", { expiresIn: '1h' })
        await verificarCredenciales(email, password)
        res.send(token)
    } catch (error) {

        console.log(error)
        handleError(res, error)
    }
}) */

/* app.delete("/usuarios/:id", async(req, res) => {
    try {
        const { id } = req.params
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token, "az_AZ")
        const { email } = jwt.decode(token)
        await deleteUsuario(id)
        res.send(`El usuario ${email} ha eliminado el evento de id ${id}`)
    } catch (error) {
        handleError(res, error)
    }
}) */