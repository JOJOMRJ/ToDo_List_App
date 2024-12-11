import './Delete.css'

const Delete = (props) => {
  
  
  const { id, logsData, onUploadLogs } = props
  console.log('del里',onUploadLogs);
  
  
  // const deleteHandler = (logsData)=>{
  //   const uploadedate = logsData.filter((item) => item.id !== id)
  //   onUploadLogs(uploadedate)
  // }
  const deleteHandler = ()=>{
    const uploadedate = logsData.filter((item) => item.id !== id)
    onUploadLogs(uploadedate)
  }
  return (
    // <div className="delete" onClick={()=>{deleteHandler(logsData)}}>&times;</div>
    <div className="delete" onClick={deleteHandler}>&times;</div>
  )
}

export default Delete