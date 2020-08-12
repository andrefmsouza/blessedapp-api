import path from 'path';

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'andredkmd@gmail.com',
        pass: 'patobranco57!'
    }
});

transport.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        partialsDir: path.resolve('./src/resources/mail/'),
        layoutsDir: path.resolve('./src/resources/mail/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}));



export default transport;