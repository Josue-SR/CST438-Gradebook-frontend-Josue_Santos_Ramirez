import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {useHistory} from 'react-router-dom';


function AddAssignment(props) { 
  const [assignments, setAssignments] = useState({
    "id": 0,
    "assignmentName": "",
    "dueDate": "",
    "courseTitle": "",
    "courseId": 31045
  });

  const [message, setMessage] = useState('');

  const history = useHistory();
  const toListAssignment = () => {
    history.push('/');
  };

  const postAssignment = ( ) => {
    setMessage('');     
    fetch(`${SERVER_URL}/assignment` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify( assignments )
        } )
    .then(res => {
        if (res.ok) {
          setMessage("Assignment saved.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Save Assignment error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Save Assignment exception =' + err);
      });
 }; 

 const saveAssignment = () => {
  if(assignments.assignmentName === "" || assignments.courseTitle === "" || assignments.dueDate === "") {
    setMessage("Inputs cannot be empty")
  } else if(/^\d{4}-\d{2}-\d{2}$/.test(assignments.dueDate)) {
    postAssignment();
  } else {
    setMessage('Due Date has incorrect format')
  }
 }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [name]: value,
    }));
  };

  const headers = ['Assignment Name', 'Course Title', 'Due Date'];

  return (
    <div>
      <h3>Add Assignments</h3>
      <div margin="auto" >
        <h4>{message}&nbsp;</h4>
            <table className="Center"> 
              <thead>
                <tr>
                  {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>
                    <input
                      name="assignmentName"
                      value={(assignments.assignmentName)? assignments.assignmentName : ""}  
                      type="text"
                      placeholder='Assignment Name'
                      onChange={(e) => onChangeInput(e)}
                    />
                    </td>
                    <td>
                      <input
                        name="courseTitle"
                        value={(assignments.courseTitle)? assignments.courseTitle : ""}  
                        type="text"
                        placeholder='Course Title'
                        onChange={(e) => onChangeInput(e)}
                      />
                    </td>
                    <td>
                      <input
                        name="dueDate"
                        value={(assignments.dueDate)? assignments.dueDate : ""}  
                        type="text"
                        placeholder='yyyy-mm-dd'
                        onChange={(e) => onChangeInput(e)}
                      /> 
                   </td>
                  </tr>
                </tbody>
            </table>
            <button onClick={saveAssignment}>Add Assignment</button>
            <button onClick={toListAssignment}>Back</button>
        </div>
    </div>
  ) 
}

export default AddAssignment;