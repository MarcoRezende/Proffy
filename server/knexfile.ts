import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        // acessando pastas e subpastas
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
};

// *OBS: migrations tem o funcionamteno semalhante ao controle
// de versão do git, onde desenvolvedores, após receberem essas
// migrações, podem implementar um projeto a partir do estado atual
// em que ele se encontra, sem se preocupar com conflitos. Ja quando
// realizam migrações (ex.: yarn knex:migrate - latest), as novas tabelas
// (tables) criadas serão comparadas com as presentes e somente as que
// não foram executadas serão executadas

// Caso haja algum problema, como erro de grafia nos campos da table do user
// (ex.: "whatsap"), o melhor a se fazer é deletar manualmente o
// arquivo sqlite, isso se não estiver sob o controle de versão