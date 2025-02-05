import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: JSON.parse(localStorage.getItem('sidebarOpen')) || false, // Initial state from localStorage
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
      // Update localStorage whenever the state changes
      localStorage.setItem('sidebarOpen', JSON.stringify(state.isOpen));
    },
    setSidebarState: (state, action) => {
      state.isOpen = action.payload;
      // Update localStorage when state is set
      localStorage.setItem('sidebarOpen', JSON.stringify(state.isOpen));
    },
  },
});

export const { toggleSidebar, setSidebarState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
