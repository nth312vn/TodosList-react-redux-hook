import { useSelector } from "react-redux";

const Navbar=()=>{
    const todos=useSelector(state=>state.todosReducer.allTodos)
    return(
        <div className='navbar'>
            <h1>My Redux Todos App</h1>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Total Todos: {todos.length}</li>
            </ul>

        </div>
    )

}
export default Navbar;