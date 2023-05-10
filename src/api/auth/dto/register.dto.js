import {
    MinLengthRules,
    CompareToRules,
    EmailRules,
    GreaterThanRules
} from '../../../shared/rules/index.js';


const RegisterValidateRules = [ 
    { type: MinLengthRules(3), prop: 'username', from: 'body' }, 
    { type: MinLengthRules(3), prop: 'password', from: 'body' },
    { type: MinLengthRules(2), prop: 'name', from: 'body' },
    { type: EmailRules, prop: 'email', from: 'body' },
    { type: GreaterThanRules(0), prop: 'age', from: 'body' },
    { type: CompareToRules('Confirm password is incorrect.'), prop: 'confirmPassword', from: 'body', with: 'password' }
];

export {
    RegisterValidateRules
}