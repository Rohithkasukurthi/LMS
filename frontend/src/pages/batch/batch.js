import React, { useState ,useContext} from "react";
import { SidebarContext } from '../../sidebarcontext';
import Sidebar from "../../components/sidebar";
import "../../styles/pages/batch.css"

const Batch = () => {
    const courseimg = require('../../assets/images/753c0bf5-8b90-4f63-ab0d-79cb4d449f79.webp')

    const [error, setError] = useState('');
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

  

  return (
    <div className="batch-container">
         <Sidebar/>
        <div className={`container ${isOpen ? 'closed' : ''}`} >
        <h1 className="batch-text">Choose the Batch </h1>
        <div style={{display:'flex'}}>
        
        <a className='card' href="$">
            <img src={courseimg} className="courseimg"  alt="courseimg"></img>
            <h2>Batch-1</h2>

        </a>
        <a className='card' href="$">
            <img src={courseimg} className="courseimg" alt="courseimg"></img>
            <h2>Batch-1</h2>

        </a>
        </div>
        <div style={{display:'flex'}}>
        
        <a className='card' href="$">
            <img src={courseimg} className="courseimg" alt="courseimg"></img>
            <h2>Batch-1</h2>

        </a>
        <a className='card' href="$">
            <img src={courseimg} className="courseimg" alt="courseimg"></img>
            <h2>Batch-1</h2>

        </a>
        </div>
        

        </div>
   
    </div>
  );
};

export default Batch;
