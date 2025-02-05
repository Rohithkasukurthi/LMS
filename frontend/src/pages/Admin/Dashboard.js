import React, { useState ,useEffect,useContext} from "react";
import Sidebar from "../../components/sidebar";
import  "../../styles/pages/Dashboard.css"
import {fetchDashboardData} from "../../utils/api"
import { SidebarContext } from '../../sidebarcontext';


function Dashboard() {
    
   
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

  
    useEffect(() => {
        const getDashboardData = async () => {
          try {
            const data = await fetchDashboardData();
            setDashboardData(data);
          } catch (err) {
            setError(err.message);
          }
        };
    
        getDashboardData();
      }, []);
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }
  
    if (!dashboardData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="dashboard">
        <Sidebar/>
        <div className={`container ${isOpen ? 'closed' : ''}`} >
        <h1>Welcome to the Admin Dashboard!</h1>
        <p><strong>User ID:</strong> {dashboardData.data.userId}</p>
        <p><strong>Email:</strong> {dashboardData.data.email}</p>
        </div>
      </div>
    );
}

export default Dashboard;
