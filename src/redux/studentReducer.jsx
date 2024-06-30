import { createSlice } from "@reduxjs/toolkit";

const initialState =  JSON.parse(localStorage.getItem('students')) ||[];

const userSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            console.log(action);
            state.push(action.payload);
        },
        updateStudent : (state, action) => {
            const { id, name, email } = action.payload;
            const existingStudent = state.find((Student) => Student.id == id);
            if(existingStudent){
                existingStudent.name = name;
                existingStudent.email = email;
            }
        },

        deleteStudent : (state, action) => {
            const id = action.payload;
            const existingStudent = state.find((Student) => Student.id == id);
            if(existingStudent){
                return state.filter((Student) => Student.id !== id);
            }

        }
    },

});


export const { addStudent, updateStudent , deleteStudent} = userSlice.actions;
export default userSlice.reducer