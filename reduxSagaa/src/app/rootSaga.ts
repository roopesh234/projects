import { all } from 'redux-saga/effects';
import watchPosts from '../features/postsSaga';

export default function* rootSaga() {
  yield all([
    watchPosts(),
  ]);
}