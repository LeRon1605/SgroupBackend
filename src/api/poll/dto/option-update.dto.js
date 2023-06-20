class Dto {
    toEntity(dto) {
        return {
            TITLE: dto.title,
        }
    }
}

const OptionUpdateDto = new Dto();

export {
    OptionUpdateDto
}