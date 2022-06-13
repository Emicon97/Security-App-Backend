"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nodemailer = require('nodemailer');
// configuracion de SMTP con mailtrap
const createTrans = () => {
    //necesitamos especificar a nodemailer que tipo de conexion queremos
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e9850001e3f0b7",
            pass: "5568cbcab5ce8e"
        }
    });
    // nos retorna esta conexion
    return transport;
};
//funcion que se encarga de disparar el correo
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //se guarda el transporter que vamos a usar que lo configuramos arriba
    const transporter = createTrans();
    // a ese transporter le pasamos la funcion sendMail y le pasamos una serie de datos
    const info = yield transporter.sendMail({
        from: '"Hello World" <foo@example.com>',
        //para pasar 1 o mas correos tienen que ir en un array
        to: `${user.email}`,
        subject: `Hola ${user.name} Bienvenido a Centinel Security`,
        //en el html podemos usar plantillas
        html: `<h1>${user.name} Bienvenido a Centinel Security</h1>`, //html body
        //nodemailer attachments enviar archivos adjuntos
        // attachments:[{
        // filename: 'nombre de archivo.txt',
        // path: "ruta del archivo"
        // }]
    });
    console.log("Message send: %s", info.messageId);
});
exports.sendMail = (user) => sendMail(user);
