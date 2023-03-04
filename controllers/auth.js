const { response } = require("express")
const bcrypt =require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const login = async(req ,res =response)=>{
    const {correo,password}=req.body;
    try {

        const usuarioDB = await Usuario.findOne({correo});
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            msg: 'login',
            token
        })

    } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error inesperado'
    });

    }

}
module.exports = {
    login
}