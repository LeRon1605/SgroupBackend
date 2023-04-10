import { 
    NotEmptyRules, 
    GreaterThanRules, 
    CharacterOnlyRules 
} from '../../../shared/rules/index.js';

export default [ 
    { type: NotEmptyRules, prop: 'fullname', from: 'body' }, 
    { type: GreaterThanRules(0), prop: 'age', from: 'body' },
    { type: CharacterOnlyRules, prop: 'fullname', from: 'body' } 
]