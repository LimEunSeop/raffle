import { render, screen, fireEvent } from '@testing-library/react'
import Arrangement from './Arrangement'

require('jest-localstorage-mock')

describe('Arrangement 컴포넌트 테스트', () => {
  it('UI가 잘 렌더링 되는가', () => {
    render(<Arrangement />)

    // 타이틀
    const titleElement = screen.getByText('자리 추첨기')
    // 행렬인풋
    const rowInput = screen.getByLabelText('행')
    const columnInput = screen.getByLabelText('열')

    expect(titleElement).toBeInTheDocument()
    expect(rowInput).toBeInTheDocument()
    expect(columnInput).toBeInTheDocument()
  })

  it('인풋 입력시 숫자만 입력되는가', () => {
    render(<Arrangement />)

    const rowInput = screen.getByLabelText('행')
    const columnInput = screen.getByLabelText('열')

    const desiredValue = '12'
    const test1 = `${desiredValue}asd`
    const test2 = `asd${desiredValue}`

    fireEvent.change(rowInput, { target: { value: test1 } })
    fireEvent.change(columnInput, { target: { value: test2 } })

    expect(rowInput).toHaveValue(desiredValue)
    expect(columnInput).toHaveValue(desiredValue)
  })

  it('인풋 입력시 자리 행렬이 생기고 로컬스토리지에 저장되는가', () => {
    render(<Arrangement />)

    const rowInput = screen.getByLabelText('행')
    const columnInput = screen.getByLabelText('열')

    const row = 3
    const column = 3

    fireEvent.change(rowInput, { target: { value: row } })
    fireEvent.change(columnInput, { target: { value: column } })

    for (let i = 0; i < row * column; i++) {
      const seat = screen.getByTestId(`seat-${i}`)
      expect(seat).toBeInTheDocument()
    }

    expect(JSON.parse(localStorage.getItem('arrangementData')!)).toEqual({
      row,
      column,
    })
  })

  it('로컬스토리지에 행렬정보가 저장돼 있으면 자리를 렌더링 하는가', () => {
    const row = 3
    const column = 3
    localStorage.setItem('arrangeData', JSON.stringify({ row, column }))

    render(<Arrangement />)

    for (let i = 0; i < row * column; i++) {
      const seat = screen.getByTestId(`seat-${i}`)
      expect(seat).toBeInTheDocument()
    }
  })
})
