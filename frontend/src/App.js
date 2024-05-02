// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route , useNavigate} from 'react-router-dom';
import TopScreen from './pages/TopScreen';
import CreateArticleScreen from './pages/CreateArticleScreen';
import ArticleDetailScreen from './pages/ArticleDetailScreen';
import AddCommentScreen from './pages/AddCommentScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import { Box } from '@mui/material';

const App = () => {

  return (
      <Router>
            <Box
      style={{
        backgroundImage: `url(/bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
        <Header/>
        <Routes>         
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  element={<ProtectedRoute/>}>
          <Route path="/" element={<TopScreen/>} />
          <Route path="/create" element={<CreateArticleScreen/>} />
          <Route path="/article/:id" element={<ArticleDetailScreen />} />
          <Route path="/comment/:id" element={<AddCommentScreen />} />
          </Route>
        </Routes>
        </Box>
      </Router>


  );
};

export default App;
