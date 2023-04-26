import {
    MinLengthRules,
    EmailRules,
    GreaterThanRules
} from '../../../shared/rules/index.js';

class Dto {
    toEntity(dto) {
        return {
            email: dto.email,
            name: dto.name,
            age: dto.age
        }
    }
}

const ProfileUpdateDto = new Dto();
const ProfileUpdateValidateRule = [
    { type: MinLengthRules(2), prop: 'name', from: 'body' },
    { type: GreaterThanRules(0), prop: 'age', from: 'body' },
];

export {
    ProfileUpdateValidateRule,
    ProfileUpdateDto
}