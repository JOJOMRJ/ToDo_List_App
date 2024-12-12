import React from 'react';

const CompletionFilter = ({ onChangeCompletion, selectedValue }) => {
  const completionChangeHandler = (event) => {
    onChangeCompletion(event.target.value); // 将选择的筛选条件传递给父组件
  };

  return (
    <div>
      <label htmlFor="completion">完成状态:</label>
      <select
        name="completion"
        value={selectedValue} 
        onChange={completionChangeHandler}
      >
        <option value="all">全部</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default CompletionFilter;
