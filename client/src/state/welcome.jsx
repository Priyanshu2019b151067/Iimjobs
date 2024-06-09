import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    recruiter : null
}
export const welcomeSlice = createSlice({
    name : 'welcome',
    initialState,
    reducers : {
        setWelcome : (state,action) =>{
            state.recruiter = action.payload.recruiter
        },
        setWelcomeLogout : (state) => {
            state.recruiter = null
        }

    }
})
export const {setWelcome,setWelcomeLogout} = welcomeSlice.actions;
export default welcomeSlice.reducer;