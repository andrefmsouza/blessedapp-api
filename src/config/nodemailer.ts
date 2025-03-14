import nodemailer from 'nodemailer'
import mailConfig from './mail'

export default nodemailer.createTransport(mailConfig);