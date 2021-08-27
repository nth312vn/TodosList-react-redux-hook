import {configureStore, createSlice} from '@reduxjs/toolkit'
import todosReducer from './reducers/todosSlice';

const store=configureStore({
    reducer:{
        todosReducer:todosReducer
    }
})



export default store;