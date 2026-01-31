import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type View = 'home' | 'shop' | 'cart';

type ViewState = {
    currentView: View | null
    previousView: View | null
}

const initialState: ViewState = {
    currentView: "home",
    previousView: null,
}

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setCurrentView(state, action: PayloadAction<View | null>) {
            state.previousView = state.currentView;
            state.currentView = action.payload;
        },
    },
})

export const { setCurrentView } = viewSlice.actions
export default viewSlice.reducer
