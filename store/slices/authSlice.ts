import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    token: string | null;
    email: string | null;
    role: string | null;
    username: string | null;
}

const initialState: AuthState = {
    token: "",
    email: "",
    role: "",
    username: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.username = action.payload.username;
        },
    },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer
