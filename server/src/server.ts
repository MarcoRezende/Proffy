// miniframework responsval por configurar e inicializar
// necessidades de um servidor.
import express from 'express';

const app = express();

// coversão de requisições para o formato json
app.use(express.json());

// app.delete('/users:id', (request, response) => {
//     // Corpo: dados para criação ou atualização de
//     // um registro.
//     console.log(request.body);

//     // Serve para identificarmos (ex. ":id") qual recurso em uma
//     // rota queremos atualizar ou deletar
//     console.log(request.params);

//     // Parametro util para paginação, filtros, ordenação, etc.
//     // Ex.: myapi.com/users?page=2&sort=name
//     console.log(request.query);

//     const users = [
//         { "name": "Marco", age: 21 },
//         { "name": "Lucas", age: 19 }
//     ];

//     return response.json(users);
// });

// 'get' é um dos metodos presentes ao realizar requisições,
// tal como 'post' ou 'delete';
app.get('/', (request, response) => {
    return response.json({message: "Hello World"})
})

// definindo porta como 3333. Por padrão,
// a porta é 80. Ex.: localhost:3333/users
app.listen(3333);