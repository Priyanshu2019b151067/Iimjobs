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
        },
        setLogout : (state) => {
            state.recruit = null,
            state.token = null
        }

    }
})
export const {setRegister,setLogout} = recruiterSlice.actions;
export default recruiterSlice.reducer;