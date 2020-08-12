import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        // dias da semana que vai no maximo até 6,
        // onde 0 representa, no caso, domingo e 6
        // sabado.
        table.integer('week_day').notNullable();
        // que horario o professor começa a atender.
        table.integer('from').notNullable();
        // até que horario o professor atende.
        table.integer('to').notNullable();

        table.integer('class_id')
          .notNullable()
          .references('id')
          .inTable('classes')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}