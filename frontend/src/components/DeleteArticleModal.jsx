import React from 'react';
import { Modal, Fade, Typography, Button, Box } from '@mui/material';

const DeleteArticleComponent = ({ open, onClose, onDelete }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, 
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            boxShadow: 24,
            padding: 4,
            borderRadius: 4,
            textAlign: 'center',
            maxWidth: '80%',
            maxHeight: '80%',
            overflowY: 'auto', // enable vertical scrolling if content exceeds modal height
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Confirm Delete</Typography>
          <Typography sx={{ marginBottom: 2 }}>Are you sure you want to delete this article?</Typography>
          <Button onClick={onDelete} color="error" variant="contained" sx={{ marginRight: 1 }}>Delete</Button>
          <Button onClick={onClose} variant="contained">Cancel</Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteArticleComponent;
