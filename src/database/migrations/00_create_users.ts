import Knex from 'knex';

export async function up( knex: Knex ){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('pwd').notNullable();
        table.string('name').notNullable();
        table.string('confirmation_token').nullable();
        table.string('resetpwd_token').nullable();
        table.timestamp('resetpwd_expires').nullable();
        table.integer('login_type').notNullable();
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table.timestamp('modified_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down( knex: Knex ){
    return knex.schema.dropTable('users');
}