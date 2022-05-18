import { Person } from '../Components/Draw'
import getShuffledPeople from './getShuffledPeople'

describe('getShuffledPeople', () => {
  const people: Person[] = [
    { name: 'a', group: '1' },
    { name: 'b', group: '1' },
    { name: 'c', group: '2' },
    { name: 'd', group: '2' },
    { name: 'e', group: '3' },
    { name: 'f', group: '3' },
  ]
  let shuffledPeople: Person[]

  beforeEach(() => {
    shuffledPeople = getShuffledPeople(people)
  })

  it('returns immutable array', () => {
    expect(people).not.toBe(shuffledPeople)
  })

  it('differs from original order of array items', () => {
    let isFirstItemNotSame = false
    for (let i = 0; i < 500; i++) {
      if (shuffledPeople[0] === people[0]) {
        shuffledPeople = getShuffledPeople(people)
      } else {
        isFirstItemNotSame = true
      }
    }

    expect(isFirstItemNotSame).toBeTruthy()
  })

  it('add a property named "adjHasSameGroup"', () => {
    shuffledPeople.forEach((person) => expect(person.adjHasSameGroup).not.toBeUndefined())
  })

  it('makes adjHasSameGroup prop of items false and it of remainer true', () => {
    let hasConsecutiveBoolean = false

    for (let i = 0; i < shuffledPeople.length - 1; i++) {
      if (shuffledPeople[0].adjHasSameGroup! <= shuffledPeople[1].adjHasSameGroup!) {
        hasConsecutiveBoolean = true
      } else {
        hasConsecutiveBoolean = false
      }
    }

    expect(hasConsecutiveBoolean).toBeTruthy()
  })
})
