import { configureStore } from '@reduxjs/toolkit'
import viewReducer from './slices/viewSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        view: viewReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
