import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure, addPostFailure, addPostSuccess, addPostsRequest } from './postsSlice';

function* fetchPosts() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/posts');
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* addPosts(action : ReturnType<typeof addPostsRequest>){
  try{
    const addResponse = yield call(axios.post, 'http://localhost:3000/posts', action.payload);
    yield put(addPostSuccess(addResponse.data));
  } catch (error) {
    yield put (addPostFailure(error.message));
  }
}

export default function* watchPosts() {
  yield takeLatest(fetchPostsRequest.type, fetchPosts);
  yield takeLatest(addPostsRequest.type, addPosts);
}