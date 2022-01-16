import React from 'react'
import { Link } from 'react-router-dom'
import { menus } from '../App'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const Main = () => {
  return (
    <>
      <Helmet>
        <title>추첨 프로그램</title>
      </Helmet>
      <div style={{}}>
        <h1 style={{ textAlign: 'center', marginBottom: '100px' }}>
          메뉴를 선택해주세요.
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '850px',
            margin: '0 auto',
          }}
        >
          {menus.map((menu) => (
            <StyledLink to={menu.path} key={menu.label}>
              {menu.label}
            </StyledLink>
          ))}
        </div>
      </div>
    </>
  )
}

const StyledLink = styled(Link)`
  display: inline-grid;
  place-items: center;
  width: 400px;
  height: 400px;
  text-decoration: none;
  background: #000;
  border-radius: 20px;
  font-size: 42px;
  color: #fff;
  font-weight: 500;
  transition: 0.6s;

  &:hover {
    background: #65d4ad;
    color: #000000;
  }
`

export default Main
