import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Change this to your backend API URL
const API_URL = 'http://localhost:5001/api/blogs';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const bookmarkPost = createAsyncThunk('posts/bookmarkPost', async ({ postId, userId }) => {
  const response = await axios.post(`${API_URL}/${postId}/bookmark`, { userId });
  return response.data;
});

export const unbookmarkPost = createAsyncThunk('posts/unbookmarkPost', async ({ postId, userId }) => {
  const response = await axios.delete(`${API_URL}/${postId}/bookmark`, { data: { userId } });
  return response.data;
});

export const fetchBookmarkedPosts = createAsyncThunk('posts/fetchBookmarkedPosts', async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}/bookmarks`);
  return response.data;
});

export const incrementViewCount = createAsyncThunk('posts/incrementViewCount', async (postId) => {
  const response = await axios.post(`${API_URL}/${postId}/view`);
  return response.data;
});

const initialState = {
  posts: [],
  currentPost: null,
  bookmarkedPosts: [],
  status: 'idle',
  postStatus: 'idle',
  error: null,
  postError: null,
  filter: 'all', // all, newest, oldest, mostViewed, category, bookmarked
  selectedCategory: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    updatePost(state, action) {
      const idx = state.posts.findIndex(p => p._id === action.payload._id);
      if (idx !== -1) state.posts[idx] = action.payload;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(p => p._id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload.filter;
      state.selectedCategory = action.payload.category || '';
    },
    clearFilter(state) {
      state.filter = 'all';
      state.selectedCategory = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.postStatus = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postStatus = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.postError = action.error.message;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.meta.arg.postId);
        if (post) {
          post.bookmarkedBy = post.bookmarkedBy || [];
          post.bookmarkedBy.push(action.meta.arg.userId);
        }
      })
      .addCase(unbookmarkPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.meta.arg.postId);
        if (post) {
          post.bookmarkedBy = post.bookmarkedBy.filter(id => id !== action.meta.arg.userId);
        }
      })
      .addCase(fetchBookmarkedPosts.fulfilled, (state, action) => {
        state.bookmarkedPosts = action.payload;
      })
      .addCase(incrementViewCount.fulfilled, (state, action) => {
        const post = state.posts.find(p => p._id === action.meta.arg);
        if (post) {
          post.views = action.payload.views;
        }
      });
  }
});

export const { addPost, updatePost, deletePost, setFilter, clearFilter } = postsSlice.actions;

export default postsSlice.reducer;
