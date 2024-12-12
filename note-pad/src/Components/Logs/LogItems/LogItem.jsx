import React, {useState} from 'react'
import Card from '../../UI/Card/Card'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Content from './Content/Content'
import Delete from '../../UI/Delete/Delete'

const LogItem = (props) => {
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
      <Delete id={props.id} onUploadLogs={props.onUploadLogs} logsData={props.logsData} />
    </Card>
  );
};

export default LogItem;