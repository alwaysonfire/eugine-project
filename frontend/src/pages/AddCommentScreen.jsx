import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddCommentScreen = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if(comment){
      axios.post(`http://localhost:5000/articles/${id}/comments`, { content: comment })
      .then(response => {
        toast.success('Comment Added')
   
      })
      .catch(error => {
        toast.error('Comment Failed')
      });
    }
    else{
      toast.error('Cant submit blank comment')
    }

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Add Comment</h1>
      <TextField
        label="Comment Content"
        variant="outlined"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ width: '50%', marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleAddComment}>
        Add
      </Button>
      <Link to={`/article/${id}`} style={{ marginTop: 10 }}>Back to Article</Link>
      <ToastContainer/>
    </Box>
  );
};

export default AddCommentScreen;
