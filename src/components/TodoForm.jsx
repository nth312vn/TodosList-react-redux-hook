import { useState } from "react"
import { useDispatch } from "react-redux";
import { addTodo } from "../store/reducers/todosSlice";

const TodoForm=()=>{
    const [title,setTitle]=useState('');
    const dispatch=useDispatch();
    const changeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const addSingleTodo=(e)=>{
        e.preventDefault();
        if (title){

            dispatch(addTodo(title));
            setTitle('');
        }
        
    }
    return(
        <div>
            <form onSubmit={addSingleTodo} >
                <input type="text" value={title} onChange={changeTitle} />
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}
export default TodoForm;