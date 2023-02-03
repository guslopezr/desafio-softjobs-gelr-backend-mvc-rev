const pool = require('../database/conexion');
const bcrypt = require('bcryptjs');

const getUsuarios = async(email) => {
    const value = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: usuarios } = await pool.query(consulta, value);
    return usuarios;
};

const registrarUsuario = async(usuario) => {
    const { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    const values = [email, passwordEncriptada, rol, lenguage];
    const consulta = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)';
    await pool.query(consulta, values);
};



const verificarCredenciales = async(email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    if (!usuario) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
    const passwordEsCorrecta = bcrypt.compareSync(password, usuario.password);
    if (!passwordEsCorrecta) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
};


module.exports = { getUsuarios, registrarUsuario, verificarCredenciales };