import { atom, selector } from "recoil";

export interface IToDo{
  text:string,
  id:number,
  category:Categories,

}
export enum Categories{
  //사실 enum의 값은 숫자다

  'TO_DO'='TO_DO', //0 그러나 ="값"을 주면 진짜 TO_DO가됨.
  'DOING'='DOING', //1
  'DONE'='DONE',  //2
}
const storage=localStorage.getItem('todo')
export const toDoState= atom<IToDo[]>({
  key:'toDo',
  default:storage ? JSON.parse(storage):[],
})
export const categoryState = atom<Categories>({
  key:'category',
  default:Categories.TO_DO,
})
export const toDoSelector = selector({
  key:'toDoSelector',
  get:({get})=>{
    const todos = get(toDoState);
    const category = get(categoryState);
    return todos.filter((todo)=>todo.category===category)
    
  }
})

