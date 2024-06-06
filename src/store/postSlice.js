import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    posts: [],     // To store all posts
    singlePost: null,  // To store a single post
    error: null,   // To store any error messages
    loading: false // To manage loading state
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchSinglePostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSinglePostSuccess: (state, action) => {
            state.loading = false;
            state.singlePost = action.payload;
        },
        fetchSinglePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        editPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        editPostSuccess: (state, action) => {
            state.loading = false;
            state.singlePost = action.payload;
            state.posts = state.posts.map(post => 
                post.id === action.payload.id ? action.payload : post
            );
        },
        editPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deletePostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deletePostSuccess: (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        deletePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchSinglePostStart,
    fetchSinglePostSuccess,
    fetchSinglePostFailure,
    editPostStart,
    editPostSuccess,
    editPostFailure,
    deletePostStart,
    deletePostSuccess,
    deletePostFailure
} = postSlice.actions;

export default postSlice.reducer;
