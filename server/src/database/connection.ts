// knex faz possivel a utilização da sintaxe js ao inves
// da sintaxe do sqlite
import knex from 'knex';
// path facilita a malipulação de caminhos.
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        // __dirname se refere a pasta atual do arquivo, onde
        // criaremos um arquivo 'database.sqlite'.
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    // usar null quando não houver um campo preenchido no
    // campo de dados.
    useNullAsDefault: true
});

export default db;