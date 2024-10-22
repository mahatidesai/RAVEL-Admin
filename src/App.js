import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import UserDetails from './components/userDetails';
import CarDetails from './components/CarDetails';
import RentDetails from './components/RentDetails';
import GenerateReports from './components/GenerateReports';

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/homepage" element={<HomePage/>}/> 
          <Route path="/userDetails" element={<UserDetails/>}/>   
          <Route path="/carDetails" element={<CarDetails/>}/>
          <Route path="/rentDetails" element={<RentDetails/>}></Route>
          <Route path="/generateReports" element={<GenerateReports/>}></Route>
        </Routes>
     </Router>
    </>
  );
}



export default App;
