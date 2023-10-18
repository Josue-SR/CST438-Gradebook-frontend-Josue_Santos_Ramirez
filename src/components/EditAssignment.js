import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {useHistory} from 'react-router-dom';


function EditAssignment(props) { 
  const [assignment, setAssignment] = useState([]);
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
    fetchAssignment();
   }, [] )

   console.log("ID: " +assignmentId)

  const fetchAssignment = () => {
    console.log("fetchAssignment");
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignment(data);
     }) 
    .catch(err => console.error(err)); 
  }

  const putAssignment = ( ) => {
    setMessage('');   
    fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
        {  
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify( assignment )
        } )
    .then(res => {
        if (res.ok) {
          fetchAssignment();
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
    setAssignment({ ...assignment, [name]: value });
  };

  const saveAssignment = () => {
    if(/^\d{4}-\d{2}-\d{2}$/.test(assignment.dueDate)) {
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
                        name="courseTitle"
                        value={(assignment.courseTitle)? assignment.courseTitle : ""}  
                        type="text"
                        placeholder='Course Title'
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
              <button id="saveButton" onClick={saveAssignment}>Save</button>
              <button onClick={toListAssignment}>Back</button>
          </div>
      </div>
  ); 
}

export default EditAssignment;