import { useState, useEffect ,useContext} from 'react';
import Sidebar from '../../components/sidebar';
import { SidebarContext } from '../../sidebarcontext';
import "../../styles/pages/LeaveManagement.css"

const LeaveManagement = () => {
    const { isOpen, toggleSidebar } = useContext(SidebarContext);
 

  return (
    <div style={{display:'flex'}}>
        <Sidebar/>
        <div className={`container ${isOpen ? 'closed' : ''}`}>
        <h1>Batch - 1 Student Attendence</h1>
        <h2 className='Leave-text'>Leave Requests</h2>
        <div className={`leave-card ${isOpen ? 'closed' : ''}`}><h3>Student Name</h3> <h3>Subject</h3> <h3>Requesting leave for college due to personal reasons kindly grant permission.college due to pe</h3><h3>Date</h3>
        <div style={{display:'flex'}}>
        <button >Accept</button>
        <button>Reject</button>
        </div>
         </div>
        </div>

    </div>
  );
};

export default LeaveManagement;
