import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        postData: {},
        postUser: '',
        postParentUser: '',
            
    },
    reducers: {
        setHomePagePosts: (state, action) => {
            state.posts = action.payload;
        } 
    },
})

export const { setHomePagePosts } = postSlice.actions;

export default postSlice.reducer;