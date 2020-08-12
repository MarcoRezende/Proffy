import express from 'express';

const routes = express.Router();

// 'post' é um dos metodos presentes ao realizar requisições,
// tal como 'get' ou 'delete';
routes.post('/classes', (request, response) => {
    const data = request.body;

    console.log(data);

    return response.send();
})

export default routes