import React from 'react'

const LogsFilter = (props) => {
  let years = [...new Set(props.logsData.map((item) => item.date.getFullYear()))]
  const changeHandler = (event) => {
    props.onChangeYear(+event.target.value)
  }
  return (
    <div>
      <label htmlFor="year">年份:</label>
      <select name="year" id="year" onChange={changeHandler}>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  )
}

export default LogsFilter