import React from 'react'
import './App.css'

import { Routes, Route, HashRouter } from 'react-router-dom'
import Main from './Components/Main'
import Arrangement from './Components/Arrangement'
// import Draw from './Components/Draw'
import DataSetting from './Components/DataSetting'
import { Layout } from './Components/Layout'

export const menus = [
  { label: '자리 바꾸기', path: '/arrangement', element: <Arrangement /> },
  // { label: '조 추첨', path: '/draw', element: <Draw /> },
  { label: '데이터 세팅', path: '/data', element: <DataSetting /> },
]

const programName = '추첨 프로그램'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout title={programName}>
              <Main />
            </Layout>
          }
        />
        {menus.map((menu) => (
          <Route
            path={menu.path}
            element={React.createElement(
              Layout,
              { title: `${programName} - ${menu.label}` },
              menu.element
            )}
            key={menu.label}
          />
        ))}
      </Routes>
    </HashRouter>
  )
}

export default App
