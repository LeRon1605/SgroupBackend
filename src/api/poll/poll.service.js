import knex from '../../database/connection.js';

class PollService {
    async getAll() {
        const rows = await knex.select(knex.raw('*, `polls`.`ID` as POLLID, `options`.`ID` as OPTIONID')).from('polls').innerJoin('options', 'polls.ID', 'options.POLLID');
        if (rows.length <= 0) return [];
        const poll = {
            id: rows[0].POLLID,
            question: rows[0].NAME,
            description: rows[0].DESCRIPTION,
            question: rows[0].question,
            options: rows.reduce((res, element) => {
                res.push({
                    id: element.OPTIONID,
                    title: element.TITLE
                })
                return res;
            }, [])
        };
        return poll;
    }

    async create(poll) {
        try {
            await knex.transaction(async trx => {
                const promiseQueue = [];
                await trx('polls').insert({ ID: poll.ID, NAME: poll.NAME, DESCRIPTION: poll.DESCRIPTION, QUESTION: poll.QUESTION });
                
                poll.OPTIONS.forEach(async x => {
                    promiseQueue.push(trx('options').insert(x));
                });

                await Promise.all(promiseQueue);
            });
        } catch (error) {
            console.log(`Create poll failed: ${error}`);
        }
    }

    async getDetail(id) {
        const rows = await knex.select(knex.raw('*, `options`.`ID` as OPTIONID')).from('polls').innerJoin('options', 'polls.ID', 'options.POLLID').where('polls.ID', id);
        if (rows.length <= 0) return null;
        const poll = {
            id: id,
            question: rows[0].NAME,
            description: rows[0].DESCRIPTION,
            question: rows[0].question,
            options: rows.reduce((res, element) => {
                res.push({
                    id: element.OPTIONID,
                    title: element.TITLE
                })
                return res;
            }, [])
        };
        return poll;
    }

    async update(id, poll) {
        try {
            const poll = await knex.select().from('polls').where('ID', id);
            if (poll.length <= 0) return false;
            await knex.transaction(async trx => {
                const promiseQueue = [];
                await trx('polls').where('ID', id).update({ NAME: poll.NAME, DESCRIPTION: poll.DESCRIPTION, QUESTION: poll.QUESTION });
                
                poll.OPTIONS.forEach(async x => {
                    promiseQueue.push(trx('options').where('ID', x.id).update(x));
                });

                await Promise.all(promiseQueue);
            });

            return true;
        } catch (error) {
            console.log(`Update poll failed: ${error}`);
            return false;
        }
    }

    async removePoll(id) {
        const poll = await knex.select().from('polls').where('ID', id);
        if (poll.length <= 0) return false;
        await knex.del().where('ID', id).from('polls');
        return true;
    }

    async addOption(id, option) {
        const poll = await knex.select().from('polls').where('ID', id);
        if (poll.length <= 0) return false;

        await knex('options').insert({ ...option, POLLID: id });
        return true;
    }

    async removeOption(pollId, optionId) {
        const option = await knex.select().from('options').where('ID', optionId);
        if (option.length <= 0) return false;
        if (option[0].POLLID != pollId) return false;

        await knex.del().where('ID', optionId).from('options');
        return true;
    }

    async updateOption(pollId, optionId, body) {
        const option = await knex.select().from('options').where('ID', optionId);
        if (option.length <= 0) return false;
        if (option[0].POLLID != pollId) return false;
        
        await knex('options').where('ID', optionId).update(body);
        return true;
    }

    async submitOption(id, optionId, userId) {
        const poll = await knex.select().from('polls').where('ID', id);
        if (poll.length <= 0) return false;

        const option = await knex.select().from('options').where('ID', optionId);
        if (option.length <= 0) return false;
        if (option[0].POLLID != id) return false;

        const user = await knex.select().from('users').where('ID', userId);
        if (user.length <= 0) return false;

        const userOption = await knex.select().from('user_options').where('OPTIONID', optionId).andWhere('USERID', userId);
        if (userOption.length > 0) return false;

        await knex('user_options').insert({
            OPTIONID: optionId,
            USERID: userId
        });
        return true;
    }

    async unSubmitOption(id, optionId, userId) {
        const poll = await knex.select().from('polls').where('ID', id);
        if (poll.length <= 0) return false;

        const option = await knex.select().from('options').where('ID', optionId);
        if (option.length <= 0) return false;
        if (option[0].POLLID != id) return false;

        const user = await knex.select().from('users').where('ID', userId);
        if (user.length <= 0) return false;

        const userOption = await knex.select().from('user_options').where('OPTIONID', optionId).andWhere('USERID', userId);
        if (userOption.length <= 0) return false;

        await knex('user_options').del().where('OPTIONID', optionId).andWhere('USERID', userId);;
        return true;
    }
}

export default new PollService();