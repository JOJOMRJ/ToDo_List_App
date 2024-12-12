import React from 'react'

const YearsFilter = (props) => {
  let years = [...new Set(props.logsData.map((item) => item.date.getFullYear()))]
  const changeHandler = (event) => {
    const selectedValue = event.target.value;
    const year = selectedValue === "all" ? "all" : +selectedValue;
    props.onChangeYear(year)
  }
  return (
    <div>
      <label htmlFor="year">年份:</label>
      <select name="year" id="year" onChange={changeHandler} value={props.seletedYear}>
        <option value='all'>全部年份</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  )
}

export default YearsFilter