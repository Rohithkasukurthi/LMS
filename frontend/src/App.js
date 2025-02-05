import './App.css';
import React, { useState,useContext } from 'react';
import StudentAuth from './pages/auth/StudentAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainerAuth from './pages/auth/trainerAuth';
import AdminAuth from './pages/auth/AdminAuth';
import TpoAuth from './pages/auth/TpoAuth';
import Sidebar from './components/sidebar';
import Dashboard from './pages/Admin/Dashboard';
import '../src/styles/global.css';  // Import variables.css first
import '../src/styles/variables.css'; 
import { SidebarContext } from './sidebarcontext';
import Batch from './pages/batch/batch';
import LeaveManagement from './pages/trainer/LeaveManagement';
import Tasks from './pages/trainer/Tasks';
import Taskview from './pages/trainer/Taskview';
import Materials from './pages/trainer/Materials';
import CreateMeeting from './components/CreateMeeting';
import Zoom from './pages/trainer/zoom';
import ZoomApp from './components/create';


function App() {

  const [meeting, setMeeting] = useState(null);

  
  
  
  return (
    <div className="App">

      <Router>
      <Routes>
        <Route path="/" element={<StudentAuth />} />
        <Route path="/TrainerAuth" element={<TrainerAuth />} />
        <Route path="/AdminAuth" element={<AdminAuth />} />
        <Route path="/TpoAuth" element={<TpoAuth />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Batch" element={<Batch />} />
        <Route path="/LeaveManagement" element={<LeaveManagement />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Task" element={<Taskview />} />
        <Route path="/Materials" element={<Materials />} />
        <Route path="/CreateMeeting" element={<CreateMeeting/>} />
        <Route path="/Zoom" element={<Zoom/>} />
        <Route path="/ZoomApp" element={<ZoomApp/>} />



  

 





   
    









      </Routes>

    </Router>

     
    </div>
  );
}

export default App;
