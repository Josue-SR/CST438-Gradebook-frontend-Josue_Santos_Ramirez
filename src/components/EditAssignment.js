import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {useHistory} from 'react-router-dom';


function EditAssignment(props) { 
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  const history = useHistory();
  const toListAssignment = () => {
    history.push('/');
  };

  let assignmentId = 0;
  const path = window.location.pathname;
  const s = /\d+$/.exec(path)[0];
  assignmentId=s;

  useEffect(() => {
    // called once after intial render
    fetchAssignments();
   }, [] )

   console.log("ID: " +assignmentId)

  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }

  const putAssignment = ( ) => {
    setMessage('');   
    fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
        {  
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify( assignments )
        } )
    .then(res => {
        if (res.ok) {
          fetchAssignments();
          setMessage("Assignment Updated.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Assignment Update error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Update Assignment exception =' + err);
      });
 }; 

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAssignments({ ...assignments, [name]: value });
  };

  const saveAssignment = () => {
    if(/^\d{4}-\d{2}-\d{2}$/.test(assignments.dueDate)) {
      putAssignment();
    } else {
      setMessage('Due Date has incorrect format')
    }
  }


  const headers = ['Assignment Name', 'Course Title', 'Due Date'];
   
  return (
      <div>
        <h3>Edit Assignment</h3>
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
              <button id="saveButton" onClick={saveAssignment}>Save</button>
              <button onClick={toListAssignment}>Back</button>
          </div>
      </div>
  ); 
}

export default EditAssignment;