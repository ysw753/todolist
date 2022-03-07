import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "./atoms";
import { useEffect } from "react";

function Create(){  
  
  const [name,setName]=useRecoilState(userState)
  const {register,handleSubmit,setValue }=useForm()

  const onSubmit=({createUser})=>{
    const localarr = localStorage?.getItem('user');

    if(localarr?.includes(createUser))
      return;
    setName((oldname)=>[...oldname,createUser]);
    setValue('createUser',' ');

    window.localStorage.setItem('user',name);
    
  }
 
 
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