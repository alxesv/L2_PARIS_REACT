import React from 'react';
import logo from './logo.svg';
import './App.scss';
import handleSubmit from './handles/handlesubmit';
import { useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import CalendarPage from './pages/Calendar';
import SeriesPage from './pages/Series';
import SeriePage from './pages/Serie';
import Register from './components/Register';
import FollowPage from './pages/Follow';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

function App() {
  return (
    <div className="App-header">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/series/:page" element={<SeriesPage />} />
        <Route path="/series/:genre/:page" element={<SeriesPage />} />
        <Route path="/series/search/:query/:page" element={<SeriesPage />} />
        <Route path="series/search/:genre/:query/:page" element={<SeriesPage />} />
        <Route path="/serie/:serieId" element={<SeriePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/followed" element={<FollowPage />} />
      </Routes>
    </div>
  );
}

export default App;
