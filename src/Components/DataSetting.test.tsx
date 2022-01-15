import { render, screen, fireEvent } from '@testing-library/react'
import DataSetting from './DataSetting'
import { RaffleData } from './DataSetting'

require('jest-localstorage-mock')

describe('DataSetting 컴포넌트 테스트', () => {
  it('인풋과 저장버튼이 잘 렌더링 되는가', () => {
    render(<DataSetting />)

    const textArea = screen.getByTestId('input')
    expect(textArea).toBeInTheDocument()

    const saveButton = screen.getByText('저장')
    expect(saveButton).toBeInTheDocument()
  })

  it('데이터 저장이 성공적으로 이루어지는가', () => {
    render(<DataSetting />)

    const data: RaffleData[] = [
      { name: 'testname1', label: 'testname1' },
      { name: 'testname2', label: 'testname2' },
    ]

    const inputElement = screen.getByTestId('input')
    fireEvent.change(inputElement, { target: { value: JSON.stringify(data) } })

    fireEvent.click(screen.getByText('저장'))
    expect(JSON.parse(localStorage.getItem('raffleData')!)).toEqual(data)
  })
})
