import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, deleteTodo, getTodos, markCompleted } from "../store/reducers/todosSlice";
import TodoForm from "./TodoForm"

const Todos=()=>{
    const todos=useSelector(state=>state.todosReducer.allTodos);
    const dispatch=useDispatch()
    const toggleTodoCompleted=(id)=>{
        dispatch(markCompleted(id));

    }
    const deleteSingleTodo=(id)=>{
        dispatch(deleteTodo(id))
    }
    useEffect(()=>{
        dispatch(getTodos(null));
    },[])
    return(
        <div className='todo-list'> 
        <TodoForm/>
        <ul>
            {todos.map(todo=>
            <li key={todo.id} className={todo.completed?'completed':''}>
                {todo.title}
                <input type="checkbox" checked={todo.completed} onChange={()=>toggleTodoCompleted(todo.id)} />
                <button onClick={()=>deleteSingleTodo(todo.id)}>Delete</button>
                </li>)
                }
        </ul>

        </div>
    )
}
export default Todos;