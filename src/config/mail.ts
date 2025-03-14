export default {
    host: process.env.MAIL_HOST as string,
    port: Number( process.env.MAIL_PORT ),
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASSWORD as string
    }
};