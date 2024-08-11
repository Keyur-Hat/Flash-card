import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashCardList from '../components/flashCardList';
import AdminDashboard from '../components/adminDashboard';

export default function Home() {
  return (
    
    <Router>
        <Routes>
          <Route path="/" exact element={<FlashCardList />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    </Router>
  )
}
