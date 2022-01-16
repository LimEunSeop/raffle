import { Person } from '../Components/Arrangement'

export default function getShuffledPeople(
  row: number,
  col: number,
  people: Person[]
) {
  const copiedPeople = [...people]
  const shuffledPeople: Person[] = []

  const checkLeftPersonSameGroup = (currentIdx: number, person: Person) => {
    if (currentIdx === 0) {
      return false
    } else {
      return person.group === shuffledPeople[currentIdx - 1].group
    }
  }

  // 자리 섞기
  while (copiedPeople.length !== 0) {
    const raffledIdx = Math.trunc(Math.random() * copiedPeople.length)

    if (
      checkLeftPersonSameGroup(
        shuffledPeople.length,
        copiedPeople[raffledIdx]
      ) === false
    ) {
      const personToMove = copiedPeople.splice(raffledIdx, 1)[0]
      personToMove.adjHasSameGroup = false
      shuffledPeople.push(personToMove)
    } else {
      let notFoundDifferentGroup = true
      for (let i = 0; i < 500; i++) {
        const reRaffledIdx = Math.trunc(Math.random() * copiedPeople.length)
        if (
          checkLeftPersonSameGroup(
            shuffledPeople.length,
            copiedPeople[reRaffledIdx]
          ) === false
        ) {
          const personToMove = copiedPeople.splice(reRaffledIdx, 1)[0]
          personToMove.adjHasSameGroup = false
          shuffledPeople.push(personToMove)
          notFoundDifferentGroup = false
          break
        }
      }

      if (notFoundDifferentGroup) {
        const personToMove = copiedPeople.splice(raffledIdx, 1)[0]
        personToMove.adjHasSameGroup = true
        shuffledPeople[shuffledPeople.length - 1].adjHasSameGroup = true
        shuffledPeople.push(personToMove)
      }
    }
  }

  return shuffledPeople
}