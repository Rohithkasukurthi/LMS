import { useState, useEffect ,useContext} from 'react';
import Sidebar from '../../components/sidebar';
import { SidebarContext } from '../../sidebarcontext';
import "../../styles/pages/Taskview.css"

const Taskview = () => {
    const { isOpen, toggleSidebar } = useContext(SidebarContext);
 

  return (
    <div style={{display:'flex'}}>
        <Sidebar/>
        <div className={`container ${isOpen ? 'closed' : ''}`}>
        <h1>Task-1</h1>
        <p className='Taskview-text'>Could you please provide more details about the specific task or project you need help with in the MERN (MongoDB, Express, React, Node.js) stack? This will help me tailor my assistance to your needs.</p>
        <div className='taskview-dates'> <h3>Posted Date:</h3><h3>1/2/24</h3><h3>Due date:</h3><h3>1/6/24</h3></div>
        <h1>Pending</h1>
        <div className='task-table'>
  <table>
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Topic</th>
        <th>Task</th>
        <th>Date</th>
        <th>Due Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>NameNameName</td>
        <td>Task-1</td>
        <td>React Components React ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact Components</td>
        <td>1/12/24</td>
        <td>1/12/24</td>
      </tr>
      <tr>
      <td>NameNameName</td>
        <td>Task-1</td>
        <td>React Components React Components</td>
        <td>1/12/24</td>
        <td>1/12/24</td>
      </tr>
      <tr>
      <td>NameNameName</td>
        <td>Task-1</td>
        <td>React Components React ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact Components</td>
        <td>1/12/24</td>
        <td>1/12/24</td>
      </tr>
      <tr>
      <td>NameNameName</td>
        <td>Task-1</td>
        <td>React Components React ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact Components</td>
        <td>1/12/24</td>
        <td>1/12/24</td>
      </tr>
      <tr>
      <td>NameNameName</td>
        <td>Task-1</td>
        <td>React Components React ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact ComponentsReact Components</td>
        <td>1/12/24</td>
        <td>1/12/24</td>
      </tr>
      
      
    </tbody>
  </table>
</div>

        </div>

    </div>
  );
};

export default Taskview;
