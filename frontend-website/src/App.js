import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Trainers from './pages/Trainers';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}

export default App;