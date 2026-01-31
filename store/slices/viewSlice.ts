import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type View = 'home' | 'shop' | 'cart';

type ViewState = {
    currentView: View | null
}

const initialState: ViewState = {
    currentView: "home",
}

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setCurrentView(state, action: PayloadAction<View | null>) {
            state.currentView = action.payload
        },
    },
})

export const { setCurrentView } = viewSlice.actions
export default viewSlice.reducer
