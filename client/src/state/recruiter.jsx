import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    recruit : null,
    token : null
}
export const recruiterSlice = createSlice({
    name : 'recruiter',
    initialState,
    reducers : {
        setRegister : (state,action) =>{
            state.recruit = action.payload.recruit,
            state.token = action.payload.token
        }

    }
})
export const {setRegister} = recruiterSlice.actions;
export default recruiterSlice.reducer;