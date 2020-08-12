import path from 'path';
import dotenv from 'dotenv'

dotenv.config({path: __dirname + '/.env'})

module.exports = {
    client: 'mysql',
    connection: {
        host : process.env.MYSQLHOST,
        user : process.env.MYSQLUSER,
        password : process.env.MYSQLPWD,
        database : process.env.MYSQLDB
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
};