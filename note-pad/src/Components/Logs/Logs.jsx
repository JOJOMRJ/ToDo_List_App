import Card from '../UI/Card/Card';
import CompletionFilter from './CompletionFilter/CompletionFilter';
import LogItem from './LogItems/LogItem';
import './Logs.css';
import YearsFilter from './YearsFilter/YearsFilter';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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

  // 拖拽结束处理函数
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedLogs = Array.from(filteredLogsData);
    const [movedItem] = reorderedLogs.splice(result.source.index, 1);
    reorderedLogs.splice(result.destination.index, 0, movedItem);

    // 将重新排序的日志更新到 props 的回调中
    props.onUploadLogs(reorderedLogs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="logs">
        <div className="filter-container">
          <YearsFilter
            logsData={props.logsData}
            onChangeYear={yearChangeHandler}
            selectedYear={year}
          />
          <CompletionFilter
            onChangeCompletion={completionChangeHandler}
            selectedValue={completion}
          />
        </div>
        <Droppable droppableId="logs">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredLogsData.length > 0 ? (
                filteredLogsData.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <LogItem
                          id={item.id} 
                          date={item.date}
                          desc={item.desc}
                          time={item.time}
                          isCompleted={item.isCompleted}
                          logsData={props.logsData}
                          onUploadLogs={props.onUploadLogs}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <h2>No logs found</h2>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </DragDropContext>
  );
};

export default Logs;
