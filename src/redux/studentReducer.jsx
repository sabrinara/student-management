import { createSlice } from "@reduxjs/toolkit";


const initialState =  JSON.parse(localStorage.getItem('students')) || [];

const userSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.push(action.payload);
        },
        updateStudent: (state, action) => {
            const { id, name, division, rollNumber, addressLine1, addressLine2, landmark, city, pincode } = action.payload;
            const existingStudent = state.find(student => student.id === id);
            if (existingStudent) {
                existingStudent.name = name;
                existingStudent.division = division;
                existingStudent.rollNumber = rollNumber;
                existingStudent.addressLine1 = addressLine1;
                existingStudent.addressLine2 = addressLine2;
                existingStudent.landmark = landmark;
                existingStudent.city = city;
                existingStudent.pincode = pincode;
            }
        },
        deleteStudent: (state, action) => {
            const id = action.payload;
            // Delete the student from the state
            return state.filter(student => student.id !== id);
        },
    },
});

export const { addStudent, updateStudent, deleteStudent } = userSlice.actions;
export default userSlice.reducer;
