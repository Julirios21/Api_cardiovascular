// backend/schemas/auth.schema.js
const {z} = require('zod'); 

exports.signupSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un texto'
    }).min(1).max(255),
    email: z.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un texto'
    }).email({
        message: 'El email debe ser un email valido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).max(255)
})

exports.signinSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un texto'
    }).email({
        message: 'El email debe ser un email valido'
    }),

    cedula: z.string({
        required_error: 'La cédula es requerida', // Mensaje actualizado
        invalid_type_error: 'La cédula debe ser un texto' 
    }).min(6, { // Ajustar la longitud mínima para la cédula si es necesario
        message: 'La cédula debe tener al menos 6 caracteres'
    }).max(20, { // Asumiendo que la cédula tiene máximo 20 caracteres (según tu DB schema)
        message: 'La cédula debe tener como máximo 20 caracteres'
    })
})