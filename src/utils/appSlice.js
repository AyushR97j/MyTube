import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name : "app",
    initialState : {
        isMenuOpen: true,
        theme : "light"
    },
    reducers : {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
        toggleTheme : (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
})

export const {toggleMenu, closeMenu, toggleTheme} = appSlice.actions;
export default appSlice.reducer;