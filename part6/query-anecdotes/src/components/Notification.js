import { useNotifValue } from "../NotifContext"
const Notification = () => {
  const msg = useNotifValue();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (msg === null || msg === undefined || msg === "") return null

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
