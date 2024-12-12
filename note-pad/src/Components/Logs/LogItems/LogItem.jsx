import React, {useState} from 'react'
import Card from '../../UI/Card/Card'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Content from './Content/Content'
import Delete from '../../UI/Delete/Delete'

const LogItem = (props) => {
  
  
  const toggleCompletionHandler = () => {
    const updatedLogs = props.logsData.map((log) => {
      if (log.id === props.id) {
        return { ...log, isCompleted: !log.isCompleted }; // 切换完成状态
      }
      return log;
    });
    props.onUploadLogs(updatedLogs); // 更新父组件的状态
  };
  // console.log('当前 isCompleted:', props.isCompleted);
  return (
    <Card className="item">
      <MyDate date={props.date} />
      <Content
        desc={props.desc}
        time={props.time}
        logsData={props.logsData}
        onUploadLogs={props.onUploadLogs}
        id={props.id}
      />
      <button 
        className='status'
        onClick={toggleCompletionHandler}
        >
        {props.isCompleted ? '已完成' : '未完成'}
      </button>
      <Delete id={props.id} onUploadLogs={props.onUploadLogs} logsData={props.logsData} />
    </Card>
  );
};

export default LogItem;