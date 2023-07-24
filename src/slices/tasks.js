import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TaskService from '../services/TaskService';

const initialState = [];
export const createTask = createAsyncThunk(
    "task/create",
    async ({ title, priority, status, tag }) => {
        const res = await TaskService.create({ title, priority, status, tag });
        return res.data;
    }
);

export const allTask = createAsyncThunk(
    "task/retrieve",
    async () => {
        const res = await TaskService.getAll();
        return res.data;
    }
);

export const singleTask = createAsyncThunk(
    "task/singleTask",
    async ({ id }) => {
        const res = await TaskService.get(id);
        return res.data;
    }
);

export const updateTask = createAsyncThunk(
    "task/update",
    async ({ id, data }) => {
        const res = await TaskService.update(id, data);
        return res.data;
    }
);

export const deleteTask = createAsyncThunk(
    "task/delete",
    async ({ id }) => {
        await TaskService.remove(id);
        return { id };
    }
);

const taskSlice = createSlice({
    name: "task",
    initialState,
    extraReducers: {
        [createTask.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [allTask.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [singleTask.fulfilled]: (state, action) => {
            let task = state.find(task => task.id === action.payload.id);
            return [task];
        },
        [updateTask.fulfilled]: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            }
        },
        [deleteTask.fulfilled]: (state, action) => {
            let index = state.findIndex(task => task.id === action.payload.id);
            state.splice(index, 1);
        }
    }
});

const { reducer } = taskSlice;
export default reducer;
