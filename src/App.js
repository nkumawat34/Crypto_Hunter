import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './Chart';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/trade" element={<Chart />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
