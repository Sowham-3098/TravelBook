import {configureStore} from '@reduxjs/toolkit'
import user from './slices/user'

export const store = configureStore({

    reducer: {  
        user
    }

})