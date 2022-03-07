import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IUserState, userState } from "./atoms";
import { useEffect } from "react";


function Create(){  
  
  const [name,setName]=useRecoilState<IUserState[]>(userState)
  const {register,handleSubmit,setValue }=useForm<IUserState>()

  const onSubmit=({createUser}:IUserState)=>{
    
    setName((oldUserId)=>{
      const duple = oldUserId?.findIndex((user)=>user.createUser===createUser);
      if(duple===-1){
        return [{createUser},...oldUserId]
      }
      return[...oldUserId];
      
    })
  } 
  console.log(name);

  useEffect(()=>{
    window.localStorage.setItem('user',JSON.stringify(name))
  },[name])
 
  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('createUser',{required:"please write your name"})}placeholder="please write yourname"/>
        <button>create</button>
      </form>
      <Link to ="/">home</Link>
    </>
  )
}

export default Create;