import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/tasks';

const reducer = {
    tasks: taskReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;
