import Card from '../UI/Card/Card';
import LogItem from './LogItems/LogItem';
import './Logs.css';
import LogsFilter from '../LogsFilter/LogsFilter';
import { useState } from 'react';

const Logs = (props) => {
  const [year, setYear] = useState('all');

  const yearChangeHandler = (year) => {
    setYear(year);
  };

  const filterLogsByYear = (logsData, year) => {
    if (year === 'all') {
      return logsData;
    }
    return logsData.filter((item) => item.date.getFullYear() === year);
  };

  const sortLogsByDate = (logsData) => {
    const now = new Date();
    return logsData.sort((a, b) => {
      return Math.abs(now - new Date(a.date)) - Math.abs(now - new Date(b.date));
    });
  };

  const filteredLogsData = sortLogsByDate(filterLogsByYear(props.logsData, year));

  // console.log(props.logsData);
  

  let logItemData = filteredLogsData.map((item) => (
    <LogItem
      key={item.id}
      id={item.id}
      date={item.date}
      desc={item.desc}
      time={item.time}
      logsData={props.logsData}
      onUploadLogs={props.onUploadLogs}
    />
  ));

  if (filteredLogsData.length === 0) {
    logItemData = <h2>No logs found</h2>;
  }

  return (
    <Card className="logs">
      <LogsFilter logsData={props.logsData} onChangeYear={yearChangeHandler} />
      {logItemData}
    </Card>
  );
};

export default Logs;
