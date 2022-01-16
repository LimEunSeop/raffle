import React, { useCallback, useEffect, useState } from 'react'

export interface RaffleData {
  name: string
  label: string
}

const defaultData = {
  groups: {
    a: '그룹1',
    b: '그룹2',
  },
  people: [
    {
      name: '사람1',
      group: 'a',
    },
    {
      name: '사람2',
      group: 'b',
    },
  ],
}

const DataSetting = () => {
  const [value, setValue] = useState('')

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const inputElements = e.target.elements
    const data = inputElements.data

    localStorage.setItem('raffleData', data.value)
  }, [])

  const handleChange = useCallback((e) => {
    const value = e.currentTarget.value
    setValue(value)
  }, [])

  useEffect(() => {
    let data = localStorage.getItem('raffleData')
    if (data) {
      data = data.trim()
      console.log(data.length)
      if (data.length === 0) {
        setValue(JSON.stringify(defaultData, null, 2))
      } else {
        setValue(JSON.stringify(JSON.parse(data), null, 2))
      }
    } else {
      setValue(JSON.stringify(defaultData, null, 2))
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <textarea
          data-testid="input"
          name="data"
          onChange={handleChange}
          rows={50}
          cols={100}
          style={{ marginTop: '50px', marginBottom: '20px' }}
          value={value}
        ></textarea>
        <button
          type="submit"
          style={{
            display: 'block',
            width: '100px',
            height: '30px',
            margin: '0 auto',
            fontSize: '16px',
          }}
        >
          저장
        </button>
      </form>
    </>
  )
}

export default DataSetting
