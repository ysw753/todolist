import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm{
  toDo:string,
}



function CreateToDo(){
  const{register,handleSubmit,setValue }=useForm<IForm>()
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onSubmit=(data:IForm)=>{
    setToDos((oldtodos)=>
      [{text:data.toDo,id:Date.now(),category},...oldtodos,]
    )   
    setValue("toDo",'');
  }
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