import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // 引入ToastContainer  
import LoginPage from './page/LoginPage'
import TenantListPage from './page/TenantListPage'

function App() {
  return (
    <>
      <ToastContainer /> {/* 在这里添加ToastContainer */}
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/list" element={<TenantListPage />} />
          {/* 其他路由... */}
        </Routes>
      </Router>
    </>

  );
}

export default App;