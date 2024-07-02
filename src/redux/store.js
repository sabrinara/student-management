import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentReducer";


const store = configureStore({
    reducer: {
        students : studentReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('students', JSON.stringify(state.students));
});

export default store;
