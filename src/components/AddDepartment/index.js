import React, { useState } from 'react';
import './index.css';
import LeftNav from '../Navbar';

class AddDepartments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentName: '',
      departments: [],
      week:""
    };
  }

  handleChangeDepartment = (event) => {
    this.setState({ departmentName: event.target.value });
  };

  handleChangeWeek = (event) =>{
    this.setState({week:event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { departmentName, departments,week } = this.state;
    if (departmentName.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3000/departments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: departmentName,week })
        });

        if (response.ok) {
          const department = await response.json();
          const updatedDepartments = [...departments, department.name];
          this.setState({ departments: updatedDepartments, departmentName: '' });
          alert('Department added');
        } else {
          alert('Failed to add department:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding department:', error.message);
      }
    } else {
      alert('Please enter a department name');
    }
  };

  render() {
    const options = [{ link: "admin-home", value: "Home" }, { link: "admin-view", value: "View" },{link:"show-department",value:"Show Departments"},{ link: "update-leave", value: "LeaveRequest" }, {link:"add-department",value:"Add Department"},{ link: "/", value: "Logout" }];
    const { departmentName,week} = this.state;
    return (
    <>
    <LeftNav options = {options}/>
      <div className="admin-departments-container">
        <h2>Add Departments</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={departmentName}
            onChange={this.handleChangeDepartment}
            placeholder="Enter department name"
          />
          <input
            type="number"
            value={week}
            onChange={this.handleChangeWeek}
            placeholder="Enter no of weeks"
          />
          <button type="submit">Add Department</button>
        </form>
      </div>
    </>
    );
  }
}

export default AddDepartments;
