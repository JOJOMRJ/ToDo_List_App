import React from 'react'
import Card from '../../../UI/Card/Card'
import './MyDate.css'

const MyDate = (props) => {
  const year = props.date.toLocaleString(undefined, { year: '2-digit' });
  const month = props.date.toLocaleString(undefined, { month: '2-digit' });
  const day = props.date.toLocaleString(undefined, {day: '2-digit'})
  
  return (
    <Card className="date">
      <div className="month">{month}/{year}</div>
      <div className="day">{day}</div>
    </Card>
  )
}

export default MyDate