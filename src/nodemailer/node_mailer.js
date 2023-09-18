import nodemailer from 'nodemailer'
export const enviarMail= async (email) => {
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: 'lopezkaren43567@gmail.com',
            pass: "ffdl etxe ztej hpqo"
        }
    }

    const mensaje = {
        from: 'lopezkaren43567@gmail.com',
        to: email,
        subject: 'correo de pruebas',
        text: 'Envio de correo desde node.js utilizando nodmailer'
    }
    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensaje)

    console.log(info);
}