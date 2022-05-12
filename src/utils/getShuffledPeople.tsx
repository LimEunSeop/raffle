import { Person } from '../Components/Arrangement'

export default function getShuffledPeople(people: Person[]) {
  const originalPeople = [...people]
  const shuffledPeople: Person[] = []

  const checkLeftPersonSameGroup = (currentIdx: number, person: Person) => {
    if (currentIdx === 0) {
      return false
    } else {
      return person.group === shuffledPeople[currentIdx - 1].group
    }
  }

  // 자리 섞기
  while (originalPeople.length !== 0) {
    const raffledIdx = Math.trunc(Math.random() * originalPeople.length)

    if (checkLeftPersonSameGroup(shuffledPeople.length, originalPeople[raffledIdx]) === false) {
      const personToMove = originalPeople.splice(raffledIdx, 1)[0]
      personToMove.adjHasSameGroup = false
      shuffledPeople.push(personToMove)
    } else {
      let notFoundDifferentGroup = true
      for (let i = 0; i < 500; i++) {
        const reRaffledIdx = Math.trunc(Math.random() * originalPeople.length)
        if (checkLeftPersonSameGroup(shuffledPeople.length, originalPeople[reRaffledIdx]) === false) {
          const personToMove = originalPeople.splice(reRaffledIdx, 1)[0]
          personToMove.adjHasSameGroup = false
          shuffledPeople.push(personToMove)
          notFoundDifferentGroup = false
          break
        }
      }

      if (notFoundDifferentGroup) {
        const personToMove = originalPeople.splice(raffledIdx, 1)[0]
        personToMove.adjHasSameGroup = true
        shuffledPeople[shuffledPeople.length - 1].adjHasSameGroup = true
        shuffledPeople.push(personToMove)
      }
    }
  }

  return shuffledPeople
}
