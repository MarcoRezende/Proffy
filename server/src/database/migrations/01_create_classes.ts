import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // Criando relacionamento: precisaremos relacionar
        // a aula dada a um professor ("id"), pois não conseguiremos
        // fazer isso mais a frente. Isso vai gerar a chamada
        // "foreign key" (conceito presente dentro dos bancos
        // de dados).
        table.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          // se o "id" for alterado na tabela users, classes
          // automaticamente reflete essa alteração em todos os
          // lugares que dependem da informação.
          .onUpdate('CASCADE')
          // se um professor for deletado da plataforma,
          // as aulas tambem serão.
          .onDelete('CASCADE');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}