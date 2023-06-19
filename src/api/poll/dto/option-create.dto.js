import { randomUUID } from 'crypto';

class Dto {
    toEntity(dto) {
        const id = randomUUID();
        return {
            ID: id,
            TITLE: dto.title,
        }
    }
}

const OptionCreateDto = new Dto();

export {
    OptionCreateDto
}