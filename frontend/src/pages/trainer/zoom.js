import React, { useState ,useContext} from "react";
import { SidebarContext } from '../../sidebarcontext';
import Sidebar from "../../components/sidebar";
import "../../styles/pages/zoom.css"
import CreateMeeting from "../../components/CreateMeeting";
import ZoomApp from "../../components/zoomapp";

const Zoom = () => {
    const courseimg = require('../../assets/images/753c0bf5-8b90-4f63-ab0d-79cb4d449f79.webp')

    const [error, setError] = useState('');
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

  

  return (
    <div className="Zoom-container" style={{display:'flex'}}>
         <Sidebar/>
        <div className={`container ${isOpen ? 'closed' : ''}`} >
        <h1 className="Zoom-text">Zoom </h1>
        <CreateMeeting/>
        <ZoomApp/>
       
        
        

        </div>
   
    </div>
  );
};

export default Zoom;
