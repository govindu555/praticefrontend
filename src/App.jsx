import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [count,setCount]=useState(0)
  const [data,setData]=useState({
    name:"",
    email:""
  })
   
  useEffect(()=>{
      second()
  },[count])

  async function second(){
    let a=await axios.get('http://localhost:4001/getusers')
    setUsers(a.data)
    setCount(count+1)
  }

  //https://praticebackend-1.onrender.com

  async function first(e){
    e.preventDefault();
    
      await axios.post("http://localhost:4001/postdata",data)
      setData({name:"",email:""})
  }

   function datafile(e){
     const {name,value}=e.target
     setData({...data,[name]:value})
   }

   async function fundelete(id){
          await axios.delete("http://localhost:4001/delete/"+id)
   }

  return (
        <div className='main'>
        <form className='form' onSubmit={first}>
          <input type='text' placeholder='name' name='name' value={data.name} required onChange={datafile}/><br/>
          <input type='email' placeholder='email' name='email' value={data.email} required onChange={datafile}/><br/>
          <input type='submit'/>
        </form>
        {
        users.map(item=>(
          <div className='main2' key={item._id}>
            <h1 className='text'>{item.name}</h1>
            <h1 className='text'>{item.email}</h1>
            <button onClick={()=>fundelete(item._id)}>Delete</button>
          </div>
        ))
        }
        </div>
  )
}

export default App
