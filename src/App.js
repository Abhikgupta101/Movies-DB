import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Movies from './pages/Movies';
import Favorites from './pages/Favorites';
import SingleMovie from './pages/SingleMovie';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes >
        < Route path='/' element={<Movies />} />
        < Route path='/register' element={<Register />} />
        < Route path='/login' element={<Login />} />
        < Route path='/favorites' element={<Favorites />} />
        < Route path='/movie/:id' element={<SingleMovie />} />
        < Route path='/*' element={<Navigate to="/" />} />
      </Routes >
    </BrowserRouter>
  );
}

export default App;
