import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  children?: React.ReactNode
}

export const Layout = ({ title, children }: Props) => {
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <header
        style={{
          textAlign: 'right',
          padding: '20px',
          fontSize: '24px',
          fontWeight: 700,
        }}
      >
        {location.pathname !== '/' && (
          <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
            메인으로
          </Link>
        )}
      </header>

      <main>{children}</main>

      <footer></footer>
    </>
  )
}
