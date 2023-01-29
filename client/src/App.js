import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.js';
import Home from './components/pages/home/home.js'
import Login from './components/pages/login/login.js'
import EspaForm from './components/pages/espaForm/espaForm.js';
import PrivForm from './components/pages/privForm/privForm.js'
import AdminHome from './components/pages/adminHome/adminHome.js'
import UpdateInfo from './components/pages/updateInfo/updateInfo.js';
import UpdateDates from './components/pages/updateDates/updateDates.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header maxWidth="lg" position="static" />
        <Routes>
          <Route exact path="/" element={<Home />} />  
          <Route path="/login" element={<Login />} /> 
          <Route path="/espaForm" element={<EspaForm />} /> 
          <Route path="/privForm" element={<PrivForm />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/updateInfo" element={<UpdateInfo />} />
          <Route path="/updateDates" element={<UpdateDates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
