import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {useHistory} from 'react-router-dom';


function AddAssignment(props) { 
  const [assignment, setAssignment] = useState({
    "id": 0,
    "assignmentName": "",
    "dueDate": "",
    "courseTitle": "",
    "courseId": ""
  });

  const [message, setMessage] = useState('');

  const token = sessionStorage.getItem("jwt");

  const history = useHistory();
  const toListAssignment = () => {
    history.push('/');
  };

  const postAssignment = ( ) => {
    setMessage('');     
    fetch(`${SERVER_URL}/assignment` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', 'Authorization': token}, 
          body: JSON.stringify( assignment )
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
  if(assignment.assignmentName === "" || assignment.courseId === "" || assignment.dueDate === "") {
    setMessage("Inputs cannot be empty")
  } else if(!(/^\d{4}-\d{2}-\d{2}$/.test(assignment.dueDate))) {
    setMessage('Due Date has incorrect format')
  } else if(!(/^\d*$/.test(assignment.courseId))){
    setMessage('Course ID has incorrect format')
  } else {
    postAssignment();
  }
 }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAssignment((prevAssignments) => ({
      ...prevAssignments,
      [name]: value,
    }));
  };

  const headers = ['Assignment Name', 'Course ID', 'Due Date'];

  return (
    <div>
      <h3>Add Assignments</h3>
      <div margin="auto" >
        <h4 id="message">{message}&nbsp;</h4>
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
                      value={(assignment.assignmentName)? assignment.assignmentName : ""}  
                      type="text"
                      placeholder='Assignment Name'
                      onChange={(e) => onChangeInput(e)}
                    />
                    </td>
                    <td>
                      <input
                        name="courseId"
                        value={(assignment.courseId)? assignment.courseId : ""}  
                        type="text"
                        placeholder='00001'
                        onChange={(e) => onChangeInput(e)}
                      />
                    </td>
                    <td>
                      <input
                        name="dueDate"
                        value={(assignment.dueDate)? assignment.dueDate : ""}  
                        type="text"
                        placeholder='yyyy-mm-dd'
                        onChange={(e) => onChangeInput(e)}
                      /> 
                   </td>
                  </tr>
                </tbody>
            </table>
            <button id="addAssignment" onClick={saveAssignment}>Add Assignment</button>
            <button onClick={toListAssignment}>Back</button>
        </div>
    </div>
  ) 
}

export default AddAssignment;