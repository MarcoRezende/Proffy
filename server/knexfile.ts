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
// de versão do git, onde desenvolvedores, após realizarem essas
// migrações, podem implementar um projeto a partir do estado atual
// em que ele se encontra, sem se preocupar com conflitos.