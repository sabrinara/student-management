import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentReducer";


const store = configureStore({
    reducer: {
        student : studentReducer,
    },
});

export default store;
