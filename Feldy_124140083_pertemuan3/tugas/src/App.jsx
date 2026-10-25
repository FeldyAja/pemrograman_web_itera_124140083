import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* BookProvider membungkus seluruh halaman agar data buku dapat diakses di mana saja */}
      <BookProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;