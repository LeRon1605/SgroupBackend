class Dto {
    toDto(entity) {
        return {
            id: entity.ID,
            name: entity.NAME,
            description: entity.DESCRIPTION,
            question: entity.QUESTION,
            options: entity.OPTIONS
        }
    }
}

const PollDto = new Dto();

export {
    PollDto
}