import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket| null>(null);
  const [msg, setMsg]= useState([]);
  const [input, setInput] = useState('');
  console.log("🚀 ~ App ~ msg:", msg)

  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:6543');
    socket.onopen = () => {
      console.log('CONNECTED');
      setSocket(socket);
    }

    socket.onmessage = (message)=> {
      console.log("Received message:", message.data);
      setMsg((m)=> [...m, message.data]);
    }

    return ()=>{
      socket.close();
    }

  },[])

  if(!socket) {
    return <div>Connecting to socket Server....</div>
  }
  return (
    <>
      <input value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={()=>{
        socket.send(input)
      }}>Send</button>
      {msg.map((item)=><div>{item}</div>)}
    </>
  )
}

export default App
