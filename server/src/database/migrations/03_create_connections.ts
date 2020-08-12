import Knex from 'knex';

export async function up(knex: Knex) {
    // quando o usuario clicar no no whataspp
    // do professor, criaremos uma conexão com
    // o professor que tentamos entrar em contato
    // (isso se deve atraves do relacionamento)
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');

        // quando esta conexão foi estabelecida
        table.timestamp('created_at')
          // esta funcção obtem o horario atual
          // que o registro esta sendo criado e salva
          // no campo "created_at"
          .defaultTo('now()')
          .notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}