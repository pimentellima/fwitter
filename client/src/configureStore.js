import { configureStore } from '@reduxjs/toolkit'
import postReducer from './containers/post/postSlice'

export default configureStore({
    reducer: {
        post: postReducer
    },
})