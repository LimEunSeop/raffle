import { Person } from '../Components/Arrangement'

/**
 * 같은 그룹인 사람이 옆자리에 섞이지 않도록 배열을 섞는다.
 *
 * @param {Person[]} people 섞을 사람 리스트
 * @returns {Person[]} 섞인 사람 리스트
 */
export default function getShuffledPeople(people: Person[]): Person[] {
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
    const randomIdx = Math.trunc(Math.random() * originalPeople.length)

    if (checkLeftPersonSameGroup(shuffledPeople.length, originalPeople[randomIdx]) === false) {
      const personToMove = originalPeople.splice(randomIdx, 1)[0]
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
        const personToMove = originalPeople.splice(randomIdx, 1)[0]
        personToMove.adjHasSameGroup = true
        shuffledPeople[shuffledPeople.length - 1].adjHasSameGroup = true
        shuffledPeople.push(personToMove)
      }
    }
  }

  return shuffledPeople
}
