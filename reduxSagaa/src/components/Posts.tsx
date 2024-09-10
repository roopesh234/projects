import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchPostsRequest, addPostsRequest} from '../features/postsSlice';
import { Box, Button, Container, Divider, List, TextField } from '@mui/material';

const Posts: React.FC = () => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPostsRequest({title, content}));
      setTitle('');
      setContent('');
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    
    <Container>
      <h1>Posts</h1>
      <Box component='form' onSubmit={handleSubmit} sx={{
        mt:2
      }}>
        <TextField id="standard-basic" label="title" variant="standard" 
        onChange={(e) => setTitle(e.target.value)} sx={{
          mr:2
        }}/>

        <TextField id="standard-basic" label="content" variant="standard" 
        onChange={(e) => setContent(e.target.value)} sx={{
          mr:2
        }} />

        <Button variant='contained' type='submit' sx={{
          mt:2
        }}>
          add post
        </Button>

        <Divider/>
        {posts.map(post => (
          <List key={post.id}>
            <Box sx={{
          boxShadow:4,
          borderRadius: 4,
          padding: 3
        }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            </Box>
            </List>
        ))}
      </Box>
      </Container>
  );
};

export default Posts;