import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];

const userSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("students", JSON.stringify(state));
        },
        updateStudent: (state, action) => {
            const { id, name, divison, rollNumber, addressLine1, addressLine2, landmark, city, pincode } = action.payload;
            const existingStudent = state.find(student => student.id === id);
            if (existingStudent) {
                existingStudent.name = name;
                existingStudent.divison = divison;
                existingStudent.rollNumber = rollNumber;
                existingStudent.addressLine1 = addressLine1;
                existingStudent.addressLine2 = addressLine2;
                existingStudent.landmark = landmark;
                existingStudent.city = city;
                existingStudent.pincode = pincode;
                localStorage.setItem("students", JSON.stringify(state));
            }
        },
        deleteStudent: (state, action) => {
            const id = action.payload;
            const index = state.findIndex(student => student.id === id);
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem("students", JSON.stringify(state));
            }
        },
    },
});

export const { addStudent, updateStudent, deleteStudent } = userSlice.actions;
export default userSlice.reducer;
