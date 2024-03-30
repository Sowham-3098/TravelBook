
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value:0,
}

const usersSlice = createSlice({
    name: 'user',
    initialState:{
        user:null,
        userLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserLoading: (state, action) => {
            state.userLoading = action.payload
        },
    },
  })
  

export const { setUser, setUserLoading } = usersSlice.actions

export default usersSlice.reducer