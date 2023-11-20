// frontend/src/routes/Router.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginView } from '../views/login/loginView';
import { IndexView } from '../views/index/indexView';
import { SignupView } from '../views/signup/signupView';
import { HomeView } from '../views/home/homeView';


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/home" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
};
