import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addPostsRequest(state, action: PayloadAction<Omit<Post, 'id'>>){
      state.loading=true;
    },
    addPostSuccess(state, action: PayloadAction<Post>){
      state.posts.push(action.payload);
      state.loading=false
    },
    addPostFailure(state, action: PayloadAction<string>){
      state.error = action.payload
      state.loading = false
    }
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostFailure,
  addPostSuccess,
  addPostsRequest,
} = postsSlice.actions;

export default postsSlice.reducer;