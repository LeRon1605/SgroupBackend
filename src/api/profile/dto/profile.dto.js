class Dto {
    toDto(entity) {
        return {
            id: entity.ID,
            username: entity.USERNAME,
            email: entity.EMAIL,
            age: entity.AGE,
            name: entity.NAME
        }
    }
}

const ProfileDto = new Dto();

export {
    ProfileDto
}