import Knex from 'knex';

export async function up( knex: Knex ){
    return knex.schema.createTable('topics', table => {
        table.increments('id').primary();

        table.integer('sketch_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('sketches')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('topic_type').notNullable();
        table.text('text', "longtext").notNullable();
        table.json('reference').notNullable();
        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table.timestamp('modified_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down( knex: Knex ){
    return knex.schema.dropTable('topics');
}