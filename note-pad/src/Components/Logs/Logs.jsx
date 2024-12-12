import Card from '../UI/Card/Card';
import CompletionFilter from './CompletionFilter/CompletionFilter';
import LogItem from './LogItems/LogItem';
import './Logs.css';
import YearsFilter from './YearsFilter/YearsFilter';
import { useState } from 'react';

const Logs = (props) => {
  const [year, setYear] = useState('all'); // 当前年份筛选
  const [completion, setCompletion] = useState('all'); // 当前完成状态筛选

  // 处理年份筛选变化
  const yearChangeHandler = (selectedYear) => {
    setYear(selectedYear);
  };

  // 处理完成状态筛选变化
  const completionChangeHandler = (selectedCompletion) => {
    setCompletion(selectedCompletion);
  };

  // 按年份筛选日志
  const filterLogsByYear = (logsData, year) => {
    if (year === 'all') {
      return logsData;
    }
    return logsData.filter((item) => item.date.getFullYear() === parseInt(year, 10));
  };

  // 按完成状态筛选日志
  const filterLogsByCompletion = (logsData, completion) => {
    if (completion === 'completed') return logsData.filter((item) => item.isCompleted);
    if (completion === 'incomplete') return logsData.filter((item) => !item.isCompleted);
    return logsData; // 显示全部
  };

  // 按日期排序日志
  const sortLogsByDate = (logsData) => {
    const now = new Date();
    return logsData.sort((a, b) => {
      return Math.abs(now - new Date(a.date)) - Math.abs(now - new Date(b.date));
    });
  };

  // 综合过滤和排序日志
  const filteredLogsData = sortLogsByDate(
    filterLogsByCompletion(
      filterLogsByYear(props.logsData, year),
      completion
    )
  );

  // 渲染日志条目
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

  // 如果没有日志，显示提示
  if (filteredLogsData.length === 0) {
    logItemData = <h2>No logs found</h2>;
  }

  return (
    <Card className="logs">
      {/* 年份筛选 */}
      <YearsFilter logsData={props.logsData} onChangeYear={yearChangeHandler} seletedYear={year} />
      
      {/* 完成状态筛选 */}
      <CompletionFilter onChangeCompletion={completionChangeHandler}  selectedValue={completion}/>
      
      {/* 日志条目 */}
      {logItemData}
    </Card>
  );
};

export default Logs;
