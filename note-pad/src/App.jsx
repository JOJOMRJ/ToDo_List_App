import { useState, useEffect } from 'react';
import './App.css';
import LogsForm from './Components/LogsForm/LogsForm';
import Logs from './Components/Logs/Logs';
import logsDataMock from './mock-data/logs-data-mock.json';

function App() {
  const [logsData, setLogsData] = useState([]);

  const loadLogsDataFromLocalStorage = () => {
    const storedLogsData = localStorage.getItem('logsData');    
    if (storedLogsData) {
      const parsedData = JSON.parse(storedLogsData);
      // 检查是否是一个空数组
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      }
    }
    return null;
  };

  const initializeLogsData = () => {
    return logsDataMock.map(log => ({
      ...log,
      isCompleted: false,
      date: new Date(log.date)
    }));
  };

  useEffect(() => {
    const localStorageData = loadLogsDataFromLocalStorage();
    const data = (localStorageData || initializeLogsData()).map(log => ({
      ...log,
      date: new Date(log.date)
    }));
    setLogsData(data);
  }, []);

  const uploadLogHandler = (newLogData) => {
    console.log("APP里的更定数据");
    
    setLogsData(newLogData);
    localStorage.setItem('logsData', JSON.stringify(newLogData));
  };

  return (
    <div className='app'>
      <LogsForm logsData={logsData} onSaveLog={uploadLogHandler} />
      <Logs logsData={logsData} onUploadLogs={uploadLogHandler} />
    </div>
  );
}

export default App;
