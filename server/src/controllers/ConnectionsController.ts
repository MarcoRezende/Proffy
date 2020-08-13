import { Request, Response } from 'express'

import db from '../database/connection';

export default class ClassesController {

    async index(request: Request, response: Response) {
        // contaremos todos os registro e, durante retorno, transformar em uma
        // coluna chamada total
        const totalConnections = await db('connections').count('* as total');

        // o retorno de db sempre será um array, e como queremos
        // apenas de um "id", passamos o primeiro index, alem de usar
        // a desestruturação.
        const { total } = totalConnections[0];

        return response.json({ total });
    }

    async create(request: Request, response: Response) {
        const { user_id } = request.body;

        await db('connections').insert({
            user_id
        })

        return response.status(201).send();
    }
}