import  {useState, useEffect} from 'react'
import './App.css'
import LogsForm from './Components/LogsForm/LogsForm'
import Logs from './Components/Logs/Logs'
import logsDataMock from './mock-data/logs-data-mock.json'

function App() {
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    const parsedLogsData = logsDataMock.map(log => ({
      ...log,
      isCompleted: false,
      date: new Date(log.date)
    }));
    setLogsData(parsedLogsData);
  }, []);


  const uploadLogHandler = (newLogData)=>{
    setLogsData(newLogData)
  }

  
  return (
   <div className='app'>
    <LogsForm logsData={logsData} onSaveLog={uploadLogHandler}/>
    <Logs logsData={logsData} onUploadLogs={uploadLogHandler}/>
   </div>
  )
}

export default App
