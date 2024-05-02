import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import moment from 'moment';

const ArticleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4), 
}));

const ArticleContent = styled('div')(({ theme }) => ({
    width: '70%', 
    textAlign: 'left',
    maxWidth: 800,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2), 
    lineHeight: '1.6', 
    fontFamily: 'serif', 
}));

const ArticleHeader = styled('div')(({ theme }) => ({
  textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const CommentCard = styled(Card)(({ theme }) => ({
    width: '70%', 
    maxWidth: 800,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const ArticleDetailScreen = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [hasUpvoted, setHasUpvoted] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:5000/articles/${id}`)
            .then(response => {
                setArticle(response.data);
                setComments(response.data.comments ? response.data.comments : []);
            })
            .catch(error => {
                console.error('Error fetching article:', error);
            });
    }, [id]);

    const handleUpvote = () => {
      const updatedVote = !hasUpvoted;


      axios.put(`http://localhost:5000/articles/${id}/vote`, { hasUpvoted: updatedVote }) 
          .then(response => {
              setHasUpvoted(updatedVote);
              setArticle({ ...article, votes: response.data.updatedVoteCount });
          })
          .catch(error => {
              console.error('Error updating vote', error);
          });
  };

    return (
        <ArticleContainer>
            {article && (
              <>
                <ArticleContent>
                    <ArticleHeader>
                        <Typography variant="h4" component="h1" >
                            {article.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                        {moment(article.createdAt).format('MMMM Do YYYY')}
                        </Typography>
                    </ArticleHeader>
                    <Typography variant="body1">
                        {article.content}
                    </Typography>
                </ArticleContent> 
                            <Button 
                            variant="contained" 
                            sx={{ mt: 2, mb: 3 }} 
                            onClick={handleUpvote}
                            disabled={!article}
                            color={hasUpvoted ? 'secondary' : 'primary'}
                        >
                            Upvote ({article.votes || 0})
                        </Button>
                        </>
            )}

            <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                Comments
            </Typography>
            {comments.map(comment => (
                <CommentCard key={comment.id}> 
                    <CardContent>
                        <Typography variant="body2" >
                            {comment.content}
                        </Typography>
                        <Typography variant="body2" >
                        {moment(comment.createdAt).format('MMMM Do YYYY')}
                        </Typography>
                    </CardContent>
                </CommentCard>
            ))}
            <Button variant="contained" component={Link} to={`/comment/${id}`} sx={{ mt: 2 }}>
                Add Comment
            </Button>
            <Link to="/" style={{ marginTop: 10 }}>Back to Bulletin Board</Link>
        </ArticleContainer>
    );
};

export default ArticleDetailScreen;
