import { randomUUID } from 'crypto';

class Dto {
    toEntity(dto) {
        const id = randomUUID();
        return {
            ID: id,
            NAME: dto.name,
            DESCRIPTION: dto.description,
            QUESTION: dto.question,
            OPTIONS: dto.options.map(x => {
                return {
                    ID: randomUUID(),
                    TITLE: x.title,
                    POLLID: id
                }
            })
        }
    }
}

const PollCreateDto = new Dto();

export {
    PollCreateDto
}