import React from 'react';
import { Card, CardContent, Typography, Link, Button, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  articleCard: {
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    '&:hover': {
      boxShadow: theme.shadows[3],
    },
  },
  articleTitle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontFamily: 'Montserrat, sans-serif',
  },
  articleContent: {
    padding: theme.spacing(2),
    fontFamily: 'Roboto, sans-serif',
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ArticleCard = ({ article, onDeleteClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.articleCard}>
      <CardContent className={classes.articleContent}>
        <Typography variant="h5" component="div" className={classes.articleTitle}>
          <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {article.title}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created Date: {article.createdAt}
        </Typography>
        <Button 
          variant="contained" 
          className={classes.deleteButton} 
          sx={{ mt: 2 }} 
          onClick={(e) => { e.preventDefault(); onDeleteClick(article.id); }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
