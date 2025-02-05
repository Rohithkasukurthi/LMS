import React, { useState,useContext } from 'react';
import '../styles/components/sidebar.css'; 
import { Link } from 'react-router-dom';
import { SidebarContext } from '../sidebarcontext';
const logo = require("../assets/images/download-removebg-preview.png")
const short_logo=require("../assets/images/short.png")
const arrow =require("../assets/icons/chevron_left_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png")
const profile_pic = require("../assets/images/pexels-anastasiya-gepp-654466-1462630.jpg")



const Sidebar = () => {

    // const [isOpen, setIsOpen] = useState(() => {
    //     // Check if 'isOpen' is stored in localStorage, otherwise default to false
    //     const savedState = localStorage.getItem('sidebarOpen');
    //     return savedState ? JSON.parse(savedState) : false;
    //   });
    const { isOpen, toggleSidebar } = useContext(SidebarContext);



    //   const togglerSidebar = () => {
    //     setIsOpen(prevState => {
    //       const newState = !prevState;
    //       // Save the new state in localStorage
    //       localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    //       return newState;
    //     });
    //   };
//       const dispatch = useDispatch();
//   const isOpen = useSelector((state) => state.sidebar.isOpen); // Access state from Redux store

//   const handleToggle = () => {
//     dispatch(toggleSidebar()); // Dispatch the action to toggle sidebar state
//   };

     
      
  
    return (
      <div className='box'>
        <div className={`sidebar-box ${isOpen ? 'closed' : ''}`}>

        <div className="image-container">
  <img className={`logo ${isOpen ? 'closed' : ''}`} src={logo} alt="logo" />
</div>         
<button className={`sidebar-btn ${isOpen ? 'closed' : ''}`} onClick={toggleSidebar}><svg className={`${isOpen ? 'arrow' : ''}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill= {isOpen?"#FFFFFF":'#152259'}><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>
            <div className={`sidebar-links ${isOpen ? 'closed' : ''}`}>
        <Link to="/dashboard" className={`sidebar-link ${isOpen ? 'closed' : ''}`} >
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Dashboard</span>
        </Link>
        <Link to="/settings" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Attendance Analysis</span>
        </Link>
        <Link to="/profile" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Recordings/ Live Sessions</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Performance Analysis</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Community Forum</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Tasks/ Assignments</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Attendence</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Leave Management</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Materials/Resources</span>
        </Link>
        <Link to="/logout" className={`sidebar-link ${isOpen ? 'closed' : ''}`}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
          <span className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Certifications/ Acheivements</span>
        </Link>
        <hr className={`line ${isOpen ? 'closed' : ''}`}/>
        <div style={{display:'flex'}}>
            <img src={profile_pic} className={`profile-pic ${isOpen ? 'closed' : ''}`} alt='profile-pic'></img>
            <p className={`sidebar-text ${isOpen ? 'hidden' : ''}`}>Admin</p>
            <svg
            className={`logout-icon ${isOpen ? 'closed' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
          </svg>
        </div>
      </div>
            

        </div>
      
      </div>
    );
  };
  
  export default Sidebar;