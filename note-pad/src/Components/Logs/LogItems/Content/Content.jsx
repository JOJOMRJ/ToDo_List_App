import React, { useState } from 'react';
import './Content.css';

const Content = ({ id,desc, time, onUploadLogs, logsData}) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false); // 是否编辑描述
  const [isEditingTime, setIsEditingTime] = useState(false); // 是否编辑时长
  const [editedDesc, setEditedDesc] = useState(desc); // 编辑中的描述
  const [editedTime, setEditedTime] = useState(time); // 编辑中的时长


  // 封装字段对应的方法
  const fieldHandlers = {
    desc: {
      cancelHandler: () => setIsEditingDesc(false),
      resetValue: () => setEditedDesc(desc),
      getValue: () => editedDesc,
      setEditing: (value) => setEditedDesc(value)
    },
    time: {
      cancelHandler: () => setIsEditingTime(false),
      resetValue: () => setEditedTime(time),
      getValue: () => editedTime,
      setEditing: (value) => setEditedTime(value)
    }
  };

  
  // 通用保存方法
  const saveHandler = (field) => {
    // 调用对应字段的 cancelHandler 来退出编辑模式
    console.log( '我执行了',field);
    
    const fieldHandler = fieldHandlers[field];
    if (!fieldHandler) return;
  
    fieldHandler.cancelHandler();
    console.log( '我执行了+1');
    const updatedLogs = logsData.map((log) => {
      if (log.id === id) {
        return { ...log, [field]: fieldHandler.getValue() }; // 获取当前值并更新
      }
      return log;
    });
    onUploadLogs(updatedLogs);
  };

  // 按键处理
  const keyActions = {
    Enter: (field) => saveHandler(field), // 按下 Enter 保存
    Escape: (field) => fieldHandlers[field].cancelHandler(), // 按下 Escape 取消
  };

  const handleKeys = (e, field) => {
    const action = keyActions[e.key];
    if (action) {
      action(field); // 调用对应的按键操作，并传递 field
    }
  };

  return (
    <div className="content">
      {/* 描述字段 */}
      {isEditingDesc ? (
        <input
          className='desc' 
          type="text"
          value={fieldHandlers.desc.getValue()}
          onChange={(e) => fieldHandlers.desc.setEditing(e.target.value)} // 更新描述
          onBlur={ () => saveHandler('desc')} // 失去焦点保存
          onKeyDown={(e) => handleKeys(e, 'desc')}
          autoFocus
        />
      ) : (
        <p 
        className='desc'  
        onClick={() => setIsEditingDesc(true)}>{desc}</p> // 点击进入编辑模式
      )}

      {/* 时长字段 */}
      {isEditingTime ? (
        <input
          type="number"
          value={editedTime}
          onChange={(e) => setEditedTime(e.target.value)} // 更新时长
          onBlur={ () => saveHandler('time')} // 失去焦点保存
          onKeyDown={(e) => handleKeys(e, 'time')} // 按 Esc 取消
          autoFocus
        />
      ) : (
        <p 
          className='time'
          onClick={() => setIsEditingTime(true)}>{time} m</p> // 点击进入编辑模式
      )}
    </div>
  );
};

export default Content;