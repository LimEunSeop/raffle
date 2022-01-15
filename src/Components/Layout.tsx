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
      <header>
        {location.pathname !== '/' && <Link to="/">메인으로</Link>}
      </header>

      <main>{children}</main>

      <footer></footer>
    </>
  )
}
