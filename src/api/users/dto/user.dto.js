class Dto {
    toDto(entity) {
        if (!entity) return null;
        return {
            id: entity.ID, 
            fullname: entity.FULLNAME, 
            gender: entity.GENDER == 1,
            age: entity.AGE 
        };
    }
}

export default new Dto();