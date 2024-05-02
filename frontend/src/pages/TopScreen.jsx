import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box , styled ,Grid  , CardActions } from '@mui/material';
import axios from 'axios';
import DeleteArticleComponent from '../components/DeleteArticleModal';
import moment from 'moment'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ArticleCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: '0.3s',
  '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.05)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  position: 'relative' 
}));

const TopScreen = () => {
  const [articles, setArticles] = useState([]);
  const [deleteArticleId, setDeleteArticleId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const openDeleteModal = (id) => {
    setDeleteArticleId(id);
  };

  const closeDeleteModal = () => {
    setDeleteArticleId(null);
  };

  const deleteArticle = (id) => {
    axios.delete(`http://localhost:5000/articles/${id}`)
        .then(response => {
            console.log('Article deleted:', response.data);
            setArticles(articles.filter(article => article.id !== id));
            closeDeleteModal();
            toast.success('Article deleted!'); 
        })
        .catch(error => {
            console.error('Error deleting article:', error);
            toast.error('Error deleting article.'); 
        });
};

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Link to="/create" > 
        <Button variant="contained"  sx={{ mb: 2 , mt: 10 }}> 
          Create New Article
        </Button>
      </Link>
      
      <Grid container spacing={4}> {/* Adjusted the spacing */}
                {articles.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} md={4}>
                        <ArticleCard> {/* Using your styled card */}
                            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <CardContent sx={{ textAlign: 'center'}}>
                              <Typography 
                                  variant="h5" 
                                  component="div" 
                                  sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: 2 }} 
                              >
                                  {article.title}
                              </Typography>
                              <hr style={{ width: '50%', margin: '15px auto', borderColor: '#ccc' }} /> 
                              <Typography 
                                  variant="body1" 
                                  sx={{ marginBottom: 1 }}
                              >
                                  {article.content.substring(0, 100)}...
                              </Typography>
                              <Typography 
                                  variant="h7" 
                                  sx={{ fontStyle: 'italic' }}
                              >
                                  {moment(article.createdAt).format('MMMM Do YYYY')}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                              position: 'absolute',
                              top: 10, 
                              right: 10,
                              backgroundColor: 'lightgray',
                              padding: '5px 10px',
                              borderRadius: 5 
                          }}>
                              {article.votes} Upvotes
                          </Typography>
                          </CardContent>
                            </Link>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => { 
                                        e.preventDefault();
                                        openDeleteModal(article.id); 
                                    }}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </ArticleCard>
                    </Grid>
                ))}
            </Grid>
      <DeleteArticleComponent
        open={deleteArticleId !== null}
        onClose={closeDeleteModal}
        onDelete={() => deleteArticle(deleteArticleId)}
      />
       <ToastContainer />
    </Box>
  );
};

export default TopScreen;
