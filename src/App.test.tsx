import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App, { menus } from './App'

describe('App 컴포넌트 테스트', () => {
  it('메인 메뉴들이 적절히 렌더링 되는가', () => {
    render(<App />)
    menus.forEach((menu) => {
      const element = screen.getByText(menu.label)
      expect(element).toBeInTheDocument()
    })
  })

  it('각 메뉴를 클릭 시, 헤더에 메인으로 가는 링크가 생성되는가', () => {
    render(<App />)

    const goToMainText = '메인으로'
    const goToMainElement = screen.queryByText(goToMainText)
    expect(goToMainElement).not.toBeInTheDocument()

    menus.forEach((menu) => {
      fireEvent.click(screen.getByText(menu.label))
      const goToMainElement = screen.getByText(goToMainText)
      expect(goToMainElement).toBeInTheDocument()
      fireEvent.click(screen.getByText(goToMainText))
    })
  })
})
