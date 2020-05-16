import namor from 'namor'

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = () => {
    const firstName = namor.generate({ words: 1, numbers: 0 });
    const lastName = namor.generate({ words: 1, numbers: 0 });
    return {
        //id (hidden), name, email address, and phone number
        id: namor.generate({ words: 0, numbers: 11 }),
        name: firstName + ' ' + lastName,
        email: firstName + '.' + lastName + '@' + namor.generate({ words: 1, numbers: 0 }) + '.com',
        phone: '+' + namor.generate({ words: 0, numbers: 12 }),
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
        ...newPerson(),
        children: range(10).map(newPerson)
      };
    });
  }
