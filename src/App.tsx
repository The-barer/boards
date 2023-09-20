import './App.css'
import {Route, Routes } from "react-router-dom";
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path='/'  element={<HomePage/>} /> 
      <Route path='/auth'  element={<AuthPage/>} /> 
      <Route path='/register'  element={<RegisterPage/>} /> 
    </Routes>
    )
}

export default App
