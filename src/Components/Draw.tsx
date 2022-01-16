import React, {
  ChangeEvent,
  useRef,
  useCallback,
  useEffect,
  useState,
  SyntheticEvent,
  useMemo,
} from 'react'
import styled from 'styled-components'
import getShuffledPeople from '../utils/getShuffledPeople'
import classnames from 'classnames'
import $ from 'jquery'

interface ArrangementData {
  row: number
  column: number
}
interface RaffleData {
  people: Person[]
  groups: Groups
}

export interface Person {
  name: string
  group: string
  adjHasSameGroup?: boolean
}

export interface Groups {
  [index: string]: string
}

const Draw = () => {
  const [row, setRow] = useState('')
  const [column, setColumn] = useState('')
  const [bannedSeatIdx, setBannedSeatIdx] = useState<Number[]>([])
  const [started, setStarted] = useState(false)

  const people = useRef<Person[]>([])
  const groups = useRef<Groups>({})
  const setting = useRef<ArrangementData>({ row: 0, column: 0 })

  const intervalId = useRef<number>()

  useEffect(() => {
    const arrangementData: ArrangementData = JSON.parse(
      localStorage.getItem('arrangementData')!
    )
    const raffleData: RaffleData = JSON.parse(
      localStorage.getItem('raffleData')!
    )

    if (arrangementData) {
      const { row, column } = arrangementData

      setting.current = { row, column }

      if (raffleData) {
        const { people: fetchedPeople, groups: fetchedGroups } = raffleData

        people.current = fetchedPeople
        groups.current = fetchedGroups
      }

      setRow(row + '')
      setColumn(column + '')
    }
  }, [])

  useEffect(() => {
    hideSeatItems()
  }, [row, column, bannedSeatIdx])

  const hideSeatItems = () => {
    const $seatArea = $('.seat__area')
    const seatAreaWidth = $seatArea.width() || 0
    const seatAreaHeight = $seatArea.height() || 0

    const seatItems =
      document.querySelectorAll<HTMLButtonElement>('.seat__item')
    seatItems.forEach((seat) => {
      seat.dataset.left = String(seat.offsetLeft)
      seat.dataset.top = String(seat.offsetTop)

      $('.seat__person', seat)
        .animate({
          left: `${seatAreaWidth / 2 - seatWidth / 2}px`,
          top: `${seatAreaHeight / 2 - seatHeight / 2}px`,
        })
        .hide()
    })
  }

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const setFunctions: {
      [index: string]: React.Dispatch<React.SetStateAction<string>>
    } = { row: setRow, column: setColumn }

    let onlyNumber = Number(value.replace(/[^0-9]/g, ''))
    onlyNumber = onlyNumber > 100 ? 100 : onlyNumber
    setFunctions[name](String(onlyNumber))

    setting.current[name as keyof ArrangementData] = onlyNumber
    localStorage.setItem('arrangementData', JSON.stringify(setting.current))
    setBannedSeatIdx([])
  }, [])

  const handleSeatClick = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      const idx = Number(e.currentTarget.dataset.idx)

      if (bannedSeatIdx.indexOf(idx) === -1) {
        setBannedSeatIdx([...bannedSeatIdx, idx])
      } else {
        setBannedSeatIdx(bannedSeatIdx.filter((x) => x !== idx))
      }
    },
    [bannedSeatIdx]
  )

  const handleStartButtonClick = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      setStarted(true)

      hideSeatItems()

      const personElements = Array.from(
        document.querySelectorAll<HTMLDivElement>('.seat__person')
      )

      const completeList: HTMLDivElement[] = []

      let zIndex = 100
      const animation = () => {
        const raffledIdx = Math.trunc(Math.random() * personElements.length)

        const $personElement = $(personElements[raffledIdx])
        const left = $personElement.parent().data('left')
        const top = $personElement.parent().data('top')

        $personElement
          .css({ zIndex: ++zIndex })
          .show(1000)
          .animate({ left: left + 1 }, Math.random() * 700 + 300)
          .animate({ top: top + 1 }, Math.random() * 700 + 300)

        completeList.push(personElements.splice(raffledIdx, 1)[0])
      }

      animation()
      const startAnimation = () => {
        intervalId.current = window.setInterval(() => {
          animation()

          if (personElements.length === 0) {
            window.clearInterval(intervalId.current)
            setStarted(false)
          }
        }, 3000)
      }
      startAnimation()
    },
    []
  )

  const shuffledPeople = useMemo(() => {
    if (people) {
      return getShuffledPeople(Number(row), Number(column), people.current)
    }
  }, [row, column, bannedSeatIdx])
  let peopleIdx = 0

  return (
    <StyledSection>
      <h1>조 추첨기</h1>
      <form style={{ marginBottom: 15 }}>
        <span style={{ marginRight: 15 }}>
          <StyledInput
            type="text"
            id="row"
            name="row"
            value={row}
            onChange={handleInputChange}
          />
          <label htmlFor="row">행</label>
        </span>
        <span>
          <StyledInput
            type="text"
            id="column"
            name="column"
            value={column}
            onChange={handleInputChange}
          />
          <label htmlFor="column">열</label>
        </span>
        <StyledButton
          type="button"
          onClick={handleStartButtonClick}
          disabled={started}
        >
          Start!
        </StyledButton>
      </form>
      <SeatArea className="seat__area">
        {Array.from(Array(Number(row)).keys()).map((eachRow, i) => (
          <div key={`row-${i}`}>
            {Array.from(Array(Number(column)).keys()).map((eachColumn, j) => {
              const idx = i * Number(column) + j
              return (
                <Seat
                  key={`column-${idx}`}
                  type="button"
                  data-idx={idx}
                  data-testid={`seat-${idx}`}
                  onClick={handleSeatClick}
                  className={classnames(
                    'seat__item',
                    bannedSeatIdx.indexOf(idx) !== -1 ? 'banned' : false
                  )}
                  disabled={started}
                >
                  {shuffledPeople &&
                    peopleIdx < shuffledPeople.length &&
                    bannedSeatIdx.indexOf(idx) === -1 && (
                      <PersonEl className="seat__person">
                        <span className="name">
                          {shuffledPeople[peopleIdx]?.name}
                        </span>
                        <span className="group">
                          {groups.current[shuffledPeople[peopleIdx++]?.group]}
                        </span>
                      </PersonEl>
                    )}
                </Seat>
              )
            })}
          </div>
        ))}
      </SeatArea>
    </StyledSection>
  )
}

const seatWidth = 180
const seatHeight = 80

const StyledSection = styled.section`
  text-align: center;
`

const SeatArea = styled.div`
  position: relative;
  display: inline-block;
`

const Seat = styled.button`
  box-sizing: border-box;
  width: ${seatWidth}px;
  height: ${seatHeight}px;
  margin: 10px;
  padding: 0;
  border: 1px solid #000;
  border-radius: 10px;
  vertical-align: top;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #dadada;
  }

  &.banned {
    background: #c32148;

    &:hover {
      background: #a51d3c;
    }
  }

  &:disabled {
    color: #000;
  }
`

const PersonEl = styled.div`
  position: absolute;
  /* left: 50%; */
  /* top: 50%; */
  /* opacity: 0; */
  box-sizing: border-box;
  display: block;
  width: ${seatWidth}px;
  height: ${seatHeight}px;
  border: 1px solid #000;
  margin-left: -1px;
  margin-top: -1px;
  border-radius: 10px;
  background: #f8f6cc;

  .name {
    display: block;
    font-weight: 700;
    font-size: 22px;
    margin-top: 15px;
    margin-bottom: 5px;
  }
`

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 50px;
  height: 30px;
  text-align: right;
  margin-right: 15px;
  padding-right: 15px;
  font-size: 16px;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 65px;
  height: 30px;
  font-size: 16px;
  margin-left: 25px;
`

export default Draw
