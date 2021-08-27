import {  createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios'
export const getTodos = createAsyncThunk('todos/todosFetched', async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/todos?_limit=5'
	)
	return response.data
})
export const addTodo=createAsyncThunk('todos/addTodos', async(title)=>{
    const newTodo={
        id:nanoid(),
        title:title,
        completed:false
    }
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    return newTodo;
} );
export const deleteTodo = createAsyncThunk(
	'todos/todoDeleted',
	async todoId => {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
		return todoId
	}
)

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        // addTodo: {
        //     reducer: (state, action) => {
        //         if(action.payload){

        //             state.allTodos.push(action.payload);
        //         }
        //     },
        //     prepare:(title)=>{
                

        //             return {payload:{
        //                 id:nanoid(),
        //                 title:title,
        //                 completed:false,
        //             }
        //     }}

        // },
        markCompleted:(state,action)=>{
            const todoId=action.payload;
            
            const index=state.allTodos.findIndex(todo=>todo.id===todoId);
            if(index!==-1){
                state.allTodos[index].completed=!state.allTodos[index].completed;
            }
            
            
        },
        // deleteTodo:(state,action)=>{
        //     const todoId=action.payload;
        //     console.log(todoId)
        //     const index=state.allTodos.findIndex(todo=>todo.id===todoId);
        //     console.log(index)
        //     if (index!==-1){
        //         state.allTodos.splice(index,1);
        //     }
        // }
        
    },
    extraReducers:{
        [getTodos.pending]: (state, action) => {
			console.log('Fetching todos from backend ....')
		},
		[getTodos.fulfilled]: (state, action) => {
			console.log('Done')
			state.allTodos=action.payload;
		},
		[getTodos.rejected]: (state, action) => {
			console.log('Failed to get todos!!!')
		},
        [addTodo.fulfilled]:(state,action)=>{
            state.allTodos.push(action.payload);
        },
        [deleteTodo.fulfilled]: (state, action) => {
			const todoId = action.payload
			state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
		}
    }
});

const todosReducer = todosSlice.reducer;

// export const { addTodo } = todosSlice.actions;
export const {markCompleted}=todosSlice.actions;
// export const {deleteTodo}=todosSlice.actions;
export default todosReducer;