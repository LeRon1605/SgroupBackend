class Dto {
    toEntity(dto) {
        return {
            NAME: dto.name,
            DESCRIPTION: dto.description,
            QUESTION: dto.question,
            OPTIONS: dto.options.map(x => {
                return {
                    ID: x.id,
                    TITLE: x.title
                }
            })
        }
    }
}

const PollUpdateDto = new Dto();

export {
    PollUpdateDto
}