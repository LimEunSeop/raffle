import React from 'react'
import { Link } from 'react-router-dom'
import { menus } from '../App'
import { Helmet } from 'react-helmet'

const Main = () => {
  return (
    <>
      <Helmet>
        <title>추첨 프로그램</title>
      </Helmet>
      <h1>메뉴를 선택해주세요.</h1>
      {menus.map((menu) => (
        <Link to={menu.path} key={menu.label}>
          {menu.label}
        </Link>
      ))}
    </>
  )
}

export default Main
