import './App.css';
import React, { useState } from 'react';

function App() {
 const initialFormData = {
        fullName : '',
       registerNumber:'',
        rollNumber:'',
        phoneNumber:'',
        gender:'',
        branch:'',
        semesterName:'',
        subjectName:'',
        checkbox:'',
 };
const [formData, setFormData] = useState(initialFormData);
const [savedId, setSavedId] = useState(null);
const [data, setData] = useState({});

const handleChange = (event) => {
const {name, value, type, checked } = event.target;
const inputValue = type === 'checkbox' ? checked : value;
setFormData((prevData) => ({
...prevData,
 [name]: inputValue
}));
};

const handleSubmit = async (event) => {
event.preventDefault();

 try {
    const response = await fetch('http://localhost:5500/submit', {
    method: 'POST',
    headers: {
 'Content-Type': 'application/json',
},
 body: JSON.stringify(formData),
});

  if (!response.ok) {
  throw new Error('Error saving form data');
}
 const data = await response.json();
  setSavedId(data.id);
  console.log('Form data submitted:', data);
  setFormData(initialFormData);
} catch (error) {
   console.error('An error occurred:', error);
 }
};

const handleViewClick = async () => {

  if(savedId) {
   try {
     const response = await fetch(`http://localhost:5500/data?id=${savedId}`);
     const fetchedData = await response.json();
     setData(fetchedData);
     console.log(Object.entries(fetchedData));
     } catch (error) {
     console.error('Error fetching data:', error);
    }
}
};
return (
    <div>
      <h1>Supplementary Registration Form</h1>
      <form onSubmit={handleSubmit}>
      <label>
         Full Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br/>
        <br/>
       <label>
          Register Number:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br/>
        <br/>
        <label>
          Roll Number:
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
          />
        </label>
        <br/>
        <br/>
        <label>
          Phone Number:
          <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          />
        </label>
        <br/>
        <br/>
        <label>
          Gender :
          <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
        />
        Female
        </label>
        <br/>
        <br/>
        <label>
          Branch:
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          />
        </label>
        <br/>
        <br/>
        <label>
          Semester Name:
          <select
            name="semesterName"
            value={formData.semesterName}
            onChange={handleChange}
          >
            <option value="nothing">--Select Semester--</option>
            <option value="1">S1</option>
            <option value="2">S2</option>
            <option value="3">S3</option>
            <option value="4">S4</option>
            <option value="5">S5</option>
            <option value="6">S6</option>
            <option value="7">S7</option>
            <option value="8">S8</option>
          </select>
        </label>
        <br/>
        <br/>
        <label>
          Subject Name:
          <select
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
          >
            <option value="nothing">--Select Subject--</option>
            <optgroup label="S1"><option value="first">Calculus</option>
        <option value="second">Engineering Physics</option>
        <option value="second">Engineering Mechanics</option>
        <option value="second">Engineering Chemistry</option>
    </optgroup>
    <optgroup label="S2"><option value="second">Digital system design</option>
        <option value="second">Data structure</option>
        <option value="second">Business Economics</option>
        <option value="second">Digital circuit</option>
    </optgroup>
    <optgroup label="S3"><option value="third">LACA</option>
        <option value="third">Nano-Technology</option>
        <option value="third">Economics</option>
        <option value="third">Digital Electronics</option>
    </optgroup>
    <optgroup label="S4"><option value="fourth">Nuclear Engineering</option>
        <option value="fourth">Computer programming</option>
        <option value="fourth">Life skills</option>
        <option value="fourth">Mechanical workshop</option>
    </optgroup>
    <optgroup label="S5"><option value="fifth">industrial Engineering </option>
        <option value="fifth">Computer programming</option>
        <option value="fifth">AET</option>
        <option value="fifth">Power Electronics</option>
    </optgroup>
    <optgroup label="S6"><option value="sixth">Mechatronics</option>
        <option value="sixth">Food Tehnology</option>
        <option value="sixth">Life skills</option>
        <option value="sixth">Mechanical workshop</option>
    </optgroup>
    <optgroup label="S7"><option value="seventh">Automobile Engineering</option>
       <option value="seventh">Computer programming</option>
       <option value="seventh">Life skills</option>
       <option value="seventh">Metallurgy</option>
       </optgroup>
    <optgroup label="S8"><option value="eighth">VLSI</option>
       <option value="eighth">Biomedical Engineering</option>
       <option value="eighth">Robotics</option>
       <option value="eighth">Fire and Safety</option>
    </optgroup>
    </select>
    <br/>
    <br/>
    <label>
          Exam Center:
          <select
            name="examCenter"
            value={formData.examCenter}
            onChange={handleChange}
          >
            <option value="nothing">--Select Center--</option>
            <option value="1">COLLEGE OF ENGINEERING ARANMULA</option>
            <option value="2">KMCT COLLEGE OF ENGINEERING</option>
            <option value="3">KOTTAYAM INSTITUTE OF TECHNOLOGY AND SCIENCE</option>
            <option value="4">RAJAGIRI SCHOOL OF ENGINEERING TECHNOLOGY</option>
            <option value="5">COLLEGE OF ENGINEERING ADOOR</option>
            <option value="6">SREE CHITRA THIRUNAL COLLEGE OF ENGINEERING</option>
            <option value="7">IES COLLEGE OF ENGINEERING AND TECHNOLOGY</option>
            <option value="8">MAR BASELIOS COLLEGE OF ENGINEERING AND TECHNOLOGY
    </option>
          </select>
        </label>
        <br/> <br/>
    </label>
        <h2>Self Declaration</h2>
        <label>
          <input
          type="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
          required
          />
          I confirm that all the information given above is True.
        </label>
        <br/>
        <br/>
        <button type="submit">Submit</button>
    {savedId && <p>Form Data: {savedId}</p>}
    <button onClick={handleViewClick} disabled={!savedId} >View Data</button>
    {Object.entries(data).length> 0 && (
<div>
<h2>Fetched Data:</h2>

 <ul>
   {Object.entries(data).map(item => (
  <li key={item[0]}>{JSON.stringify(item,null,2)}</li>
  ))}
 </ul>
</div>
)}
 </form>
<div id="value">
</div>
</div>

);

  }
export default App;

