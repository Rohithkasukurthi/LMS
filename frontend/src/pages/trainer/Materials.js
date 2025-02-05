import React, { useState ,useContext} from "react";
import { SidebarContext } from '../../sidebarcontext';
import Sidebar from "../../components/sidebar";
import "../../styles/pages/Materials.css"

const Materials = () => {
    const courseimg = require('../../assets/images/753c0bf5-8b90-4f63-ab0d-79cb4d449f79.webp')

    const [error, setError] = useState('');
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

  

  return (
    <div className="materials-container">
         <Sidebar/>
        <div className={`container ${isOpen ? 'closed' : ''}`} >
        <h1 className="materials-text">Materials & Textbook </h1>
        <p>Refer through the wide collection of materials</p>
        <div className="material-input">
            <input placeholder="Search your course"></input>
            <button>Search</button>
            <button>Upload</button>

        </div>
        <div class="material-container">
  <a class= {`materials-card ${isOpen ? 'closed' : ''}`} href="$">
    <img src={courseimg} class="materialsimg" alt="materialsimg"/>
    <h3>Full stack development using MERN</h3>
    <p>12-08-24</p>
    <button >Download</button>
  </a>
  <a class= {`materials-card ${isOpen ? 'closed' : ''}`} href="$">
    <img src={courseimg} class="materialsimg" alt="materialsimg"/>
    <h3>Full stack development using MERN</h3>
        <p>12-08-24</p>
            <button >Download</button>


  </a>
  <a class= {`materials-card ${isOpen ? 'closed' : ''}`} href="$">
    <img src={courseimg} class="materialsimg" alt="materialsimg"/>
    <h3>Full stack development using MERN</h3>
        <p>12-08-24</p>
            <button >Download</button>


  </a>
  <a class= {`materials-card ${isOpen ? 'closed' : ''}`} href="$">
    <img src={courseimg} class="materialsimg" alt="materialsimg"/>
    <h3>Full stack development using MERN</h3>
        <p>12-08-24</p>
            <button >Download</button>


  </a>
  <a class= {`materials-card ${isOpen ? 'closed' : ''}`} href="$">
    <img src={courseimg} class="materialsimg" alt="materialsimg"/>
    <h3>Full stack development using MERN</h3>
        <p>12-08-24</p>
            <button >Download</button>


  </a>
</div>

        

        </div>
   
    </div>
  );
};

export default Materials;
