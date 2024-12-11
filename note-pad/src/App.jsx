import  {useState} from 'react'
import './App.css'
import LogsForm from './Components/LogsForm/LogsForm'
import Logs from './Components/Logs/Logs'
function App() {
  const [logsData,setLogsData] = useState([
    {
      id:"001",
      date: new Date(2021,1,20,18,30),
      desc: '学习九阳神功',
      time:30
    },
    {
      id:"002",
      date: new Date(2021,2,10,12,30),
      desc: '学习降龙十八掌',
      time:20
    },
    {
      id:"003",
      date: new Date(2021,2,21,11,30),
      desc: '学习Js',
      time:40
    },
    {
      id:"004",
      date: new Date(2022,2,21,11,30),
      desc: '学习React',
      time:40
    }
  ])


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
