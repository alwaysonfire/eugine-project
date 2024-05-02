import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CreateArticleScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    if(title && content){
      axios.post('http://localhost:5000/articles', { title, content })
      .then(response => {
        toast.success(`Article ${response.data.title} Created `)
        setTitle('')
        setContent('')

      })
      .catch(error => {
        console.error('Error posting article:', error);
        toast.success(`Article Creation Error `)
      });
    }
else{
  toast.error('Please input both title and content')
}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Create New Article</h1>
      <TextField
        label="Article Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2, width: '50%' }}
      />
      <TextField
        label="Article Content"
        variant="outlined"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2, width: '50%' }}
      />
      <Button variant="contained" onClick={handlePost}>
        Post
      </Button>
      <Link to="/" style={{ marginTop: 10 }}>Back to Bulletin Board</Link>
      <ToastContainer/>
    </Box>
  );
};

export default CreateArticleScreen;
