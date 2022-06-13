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
}

//funcion que se encarga de disparar el correo
const sendMail = async (user:any) => {
    //se guarda el transporter que vamos a usar que lo configuramos arriba
    const transporter = createTrans()
    // a ese transporter le pasamos la funcion sendMail y le pasamos una serie de datos
    const info = await transporter.sendMail({
        from: '"Hello World" <foo@example.com>', //sender address
        //para pasar 1 o mas correos tienen que ir en un array
        to: `${user.email}`, // list of receivers
        subject: `Hola ${user.name} Bienvenido a Centinel Security`, // subject line
        //en el html podemos usar plantillas
        html: `<h1>${user.name} Bienvenido a Centinel Security</h1>`, //html body
        //nodemailer attachments enviar archivos adjuntos
        // attachments:[{
                // filename: 'nombre de archivo.txt',
                // path: "ruta del archivo"
        // }]
    })

    console.log("Message send: %s", info.messageId)
}


exports.sendMail = (user:any) => sendMail(user)