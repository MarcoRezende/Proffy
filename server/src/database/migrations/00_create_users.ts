// criado manualmete.

import Knex from 'knex';

// O knex tentará importar as migrações através das metodos
// abaixo ("up" e "down").

// FAZ. Quais alterações realizar no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        // valor numerico inteiro que é incrementado
        // a cada novo registro.
        table.increments('id').primary();
        table.string('name').notNullable();
        // notNullable: Campo "obrigatório", não pode ficar vazio,
        // pois é essencial para o funcionamento da aplicação.
        table.string('avatar').notNullable();
        table.string('whataspp').notNullable();
        table.string('bio').notNullable();
    })
}

// DESFAZ. Remove algo criado com "up".
export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}