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

  const isGroupRepeated = (person: Person) => {
    if (shuffledPeople.length === 0) {
      return false
    }

    // 새로 들어올 놈과 기존 마지막 놈을 비교
    return person.group === shuffledPeople.slice(-1)[0].group
  }

  // 자리 섞기
  while (originalPeople.length !== 0) {
    const randomIdx = Math.trunc(Math.random() * originalPeople.length)

    if (isGroupRepeated(originalPeople[randomIdx]) === false) {
      const personToMove = originalPeople.splice(randomIdx, 1)[0]
      personToMove.adjHasSameGroup = false
      shuffledPeople.push(personToMove)
    } else {
      let notFoundDifferentGroup = true
      for (let i = 0; i < 500; i++) {
        const reRaffledIdx = Math.trunc(Math.random() * originalPeople.length)
        if (isGroupRepeated(originalPeople[reRaffledIdx]) === false) {
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
        shuffledPeople.slice(-1)[0].adjHasSameGroup = true
        shuffledPeople.push(personToMove)
      }
    }
  }

  return shuffledPeople
}
