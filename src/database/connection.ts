import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const db = knex({
    client: 'mysql',
    connection: {
        host : process.env.MYSQLHOST,
        user : process.env.MYSQLUSER,
        password : process.env.MYSQLPWD,
        database : process.env.MYSQLDB
    },
    useNullAsDefault: true
});

export default db;