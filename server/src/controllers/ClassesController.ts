// Geralmente, quando se refere ao typescript,
// usa se letra maiuscula
import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    // quando queremos fazer uma listagem usamos index, por isso
    // nomeamos este motodo desta forma.
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // caso não haja algums dos querys, retornaremos um erro,
        // pois a rota só pode fuincionar com todas as informações.
        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(404).json({
                error: 'Missing filters to search class'
            })
        }

        const timeInMinutes = convertHourToMinutes(time as string);


        const classes = await db('classes')
          // como arrow function não cria escopo, declaramos a função
          // desta forma, obtendo acesso ao "this".

          // retorna apeans onde existe, isto é, caso as condições abaixo
          // retorne algo.
          .whereExists(function() {
              this.select('class_schedule.*')
                .from('class_schedule')
                // obtendo os horarios (class_schedule) que possuem o
                // mesmo 'id' que 'classes' estamos listando.
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                // obtendo class_schedule que possui o mesmo dia do requisitado.
                // Cada um dos "??" se refere a um query dentro do array, caso
                // houvem mais: "... ?? ??' [week_day, time]"
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                // buscando por aulas que comecem antes do horario especificado
                // ou igaul ao valor.
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                // buscando por aulas que terminam antes do valor
                // especificado.
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
          })
        // verificando se a materia bate;
          .where('classes.subject', '=', subject)
          // juntamos a tabela users e class onde o 'classes.user_id' e
          // 'users_id' sejam o mesmo.
          .join('users', 'classes.user_id', '=', 'users.id')
          // queremos selecionar TODOS (*) os dados da tabela
          // classes e users.
          .select(['classes.*', 'users.*'])

        let classSchedule = await db('class_schedule')

        // não é a forma mais correta, mas está funcionando corretamente
        classes.map((classItem, index) => {
            classes[index]['schedule'] = classSchedule.filter(item => item.class_id === classItem.id)
        })

        return response.json(classes);
    }

    // Como não estamos usando a tipagem proria do express,
    // é necessario importa-la.
    async create(request: Request, response: Response) {
        // desestruturação: atribuindo cada propriedade
        // do reqeust.body em variaveis unicas.
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        // quando um dos insters falhar todos os outros
        // tambem "falham". Sem isso os dados dos que
        // não falharam seriam mantidos.
        const trx = await db.transaction();

        try {
            // await: cada operação no banco de dados leva um tempo
            // para ocorrer - promise em js - , então usando o await
            // iremos aguardar a operação ocorrer no banco de dados
            // para então continuar processando o restante do codigo.
            // Precisa ser assincrono ("async").

            // O primeiro parametro da função é a tabela que faremos
            // a inserção do dado.
            const insertedUsersIds = await trx('users').insert({
                // estamos passando os dados necessarios
                // para a tabela user, usando da short syntax
                // do js, onde, caso a chave e a variavel pussuirem
                // o mesmo identificador/nome, podemos omitir
                // o valor.
                name,
                avatar,
                whatsapp,
                bio
            })

            // quando inserimos dados a tabela, também é inserido
            // um 'id', que é retornado por padrão em um array, pois
            // poderiamos inserir um array com varios users, obtendo
            // diversos ids.
            const user_id = insertedUsersIds[0];

            const insertedUClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedUClassesIds[0];

            // por termos definido uma interface, o typescript eesta em conformidade
            // e editor é capaz de usar sua intelegencia de autocompletar
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            })

            // ja estamos passando um array, então não precisamos
            // da sintaxe de array dentro de insert.
            await trx('class_schedule').insert(classSchedule)

            // realizar as alterações no banco
            await trx.commit();

            // codigo 201 dentro do http significa criado com sucesso.
            return response.status(201).send();
        } catch (err) {
            // desfazer qualquer alteração que tenha acontecido no banco durante o "try".
            await trx.rollback();

            return response.status(400).json({
                error: "Unexpected error while creating new class"
            })
        }
    }
}