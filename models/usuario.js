const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {

        type: Boolean,
        default: false

    }
});


usuarioSchema.method('toJSON',function(){
    
    const {__v,_id,password,...object}=this.toObject();
    object.uid=_id;
    return object;
})

module.exports = model('Usuario', usuarioSchema);
