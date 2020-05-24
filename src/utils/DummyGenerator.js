import { uniqueNamesGenerator, names } from 'unique-names-generator';

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const domains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'aol.com',
    'msn.com',
    'outlook.com',
    'googlemail.com'
];

const newPerson = () => {
    const firstName = uniqueNamesGenerator({ dictionaries: [names], length: 1 });
    const lastName = uniqueNamesGenerator({ dictionaries: [names], length: 1 });
    const domain = uniqueNamesGenerator({ dictionaries: [domains], length: 1 });
    return {
        participantId: Math.floor(Math.random() * 10000000000),//TODO id from store?
        name: firstName + ' ' + lastName,
        email: firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + domain,
        phone: Math.floor(Math.random() * 100000000000)
    }
}

export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}


export function getDummyData(len = 20) {
    return range(len).map(d => {
        return {
            ...newPerson()
        };
    });
}
