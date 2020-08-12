import Knex from 'knex';

export async function up( knex: Knex ){
    return knex.schema.createTable('sketches', table => {
        table.increments('id').primary();

        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.string('title').notNullable();
        table.integer('share_type').notNullable();
        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table.timestamp('modified_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down( knex: Knex ){
    return knex.schema.dropTable('sketches');
}