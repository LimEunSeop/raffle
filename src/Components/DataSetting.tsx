import React, { useCallback, useState } from 'react'

export interface RaffleData {
  name: string
  label: string
}

const DataSetting = () => {
  const [value, setValue] = useState(localStorage.getItem('raffleData'))

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const inputElements = e.target.elements
    const data = inputElements.data

    localStorage.setItem('raffleData', data.value)
  }, [])

  const handleChange = useCallback((e) => {
    const value = e.currentTarget
    setValue(value)
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea data-testid="input" name="data" onChange={handleChange}>
          {value}
        </textarea>
        <button type="submit">저장</button>
      </form>
    </>
  )
}

export default DataSetting
