import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm{
  toDo:string,
}



function CreateToDo(){
  const{register,handleSubmit,setValue }=useForm<IForm>()
  const [ToDos,setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onSubmit=(data:IForm)=>{
    setToDos((oldtodos)=>
      [{text:data.toDo,id:Date.now(),category},...oldtodos,]
    )   
    setValue("toDo",'');
  }
  useEffect(()=>{
    window.localStorage.setItem('todo',JSON.stringify(ToDos))
  },[ToDos])
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("toDo",{required:"write here!!!"})}
        placeholder="write here!"
      />
      <button>add</button>
    </form>
  )
}
export default CreateToDo;