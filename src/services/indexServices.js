//versión cgpt 220128-10:28

const pool = require('../database/conexion');
const bcrypt = require('bcryptjs');

const getUsuarios = async (email) => { // para validar hay que darle un algún parámetro para validar sino, no te tomará nada
    const value = [email]               // en este caso ocupamos el correo, ya que la contraseña es mala práctica según la clase
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: usuarios } = await pool.query(consulta, value);
    return usuarios;
};

const registrarUsuario = async (usuario) => {
    const { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password); // el hashSync es asíncrono, borré el segundo parametro porque no sé que hacía
    const values = [email, passwordEncriptada, rol, lenguage];
    const consulta = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)';
    await pool.query(consulta, values);
};


const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
}

module.exports = { getUsuarios, registrarUsuario, verificarCredenciales };









/* const deleteUsuario = async(id) => {
    const consulta = 'DELETE FROM usuarios WHERE id = $1';
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);

    if (!rowCount) {
        throw { code: 404, message: 'No se encontró ningún usuario con este ID' };
    }
};
 */