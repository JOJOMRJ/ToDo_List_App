import React, { useState } from 'react'
import './LogsForm.css'
import Card from '../UI/Card/Card'

const LogsForm = (props) => {
  
  const [inputDate, setInputDate] = useState('')
  const [inputDesc, setInputDesc] = useState('')
  const [inputTime, setInputTime] = useState('')

  const dateChangeHandler = (event)=> {
    // console.log(event.target.value);
    setInputDate(event.target.value)
  }

  const descChangeHandler = (event)=> {
    setInputDesc(event.target.value)
  }

  const timeChangeHandler = (event)=> {
    setInputTime(event.target.value)
  }


  const submitHandler = (event) => {
    event.preventDefault();
    const newLog = {
      id: Date.now()+"",
      date: new Date(inputDate),
      desc: inputDesc,
      time: +inputTime
    }
    
    const uploadedate = [newLog, ...props.logsData]
    props.onSaveLog(uploadedate)

    setInputDate('')
    setInputDesc('')
    setInputTime('')
  }



  return (
    <Card className='logs-form'>
      <form onSubmit={submitHandler}>
        <div className="form-item">
          <label htmlFor="date">日期</label>
          <input type="date" id='date' onChange={dateChangeHandler} value={inputDate}/>
        </div>
        <div className="form-item">
          <label htmlFor="desc">内容</label>
          <input type="text" id='desc' onChange={descChangeHandler} value={inputDesc}/>
        </div>
        <div className="form-item">
          <label htmlFor="time">时长</label>
          <input type="number" id='time' onChange={timeChangeHandler} value={inputTime}/>
        </div>
        <div className="form-btn">
          <button>添加</button>
        </div>
      </form>
    </Card>
  )
}

export default LogsForm