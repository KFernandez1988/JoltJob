'use client';

import { useState } from 'react';
import { Table, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; 
import Link from 'next/link';
import SimpleModal from '@/components/organisms/modal/SimpleModal';
import FileUpload from '@/components/organisms/forms/uploadFiles';
import JobOpeningForm from '@/components/organisms/forms/jobOpeningForm';
import CompanyFormModal from '@/components/organisms/forms/companyForm';

export default function Home() {
  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      name: 'John',
      lastname: 'Doe',
      positionRequested: 'Software Engineer',
      recommendedPosition: 'Senior Engineer',
      salary: '$120,000',
      hiredStatus: 'Hired',
      startDate: '2024-09-01',
      leaveStatus: 'None',
      peersReview: 4.75,
      positionRequestedCompatibility: 90.25,  
      companyCompatibility: 85.50, 
      isliked: false
    },
    {
      id: 2,
      name: 'Jane',
      lastname: 'Smith',
      positionRequested: 'Product Manager',
      recommendedPosition: 'Senior Product Manager',
      salary: '$130,000',
      hiredStatus: 'Hired',
      startDate: '2024-08-15',
      leaveStatus: 'Quit',
      peersReview: 4.50,
      positionRequestedCompatibility: 88.10,
      companyCompatibility: 78.35,
      isliked: false
    },
    {
      id: 3,
      name: 'Alex',
      lastname: 'Johnson',
      positionRequested: 'Data Scientist',
      recommendedPosition: 'Lead Data Scientist',
      salary: '$150,000',
      hiredStatus: 'Hired',
      startDate: '2024-07-10',
      leaveStatus: 'Fired',
      peersReview: 3.80,
      positionRequestedCompatibility: 72.40,
      companyCompatibility: 65.80,
      isliked: false
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenJob, setIsModalOpenJob] = useState(false);
  const [isModalOpenCom, setIsModalOpenCom] = useState(false);
  const [editingSalary, setEditingSalary] = useState(null);
  const [editingStartDate, setEditingStartDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [leaveDropdownOpen, setLeaveDropdownOpen] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalJob = () => setIsModalOpenJob(true);
  const closeModalJob = () => setIsModalOpenJob(false);
  const openModalCom = () => setIsModalOpenCom(true);
  const closeModalCom = () => setIsModalOpenCom(false);

  const handleSalaryChange = (index, value) => {
    const updatedEmployees = [...employeeData];
    updatedEmployees[index].salary = value;
    setEmployeeData(updatedEmployees);
  };

  const handleStartDateChange = (index, value) => {
    const updatedEmployees = [...employeeData];
    updatedEmployees[index].startDate = value;
    setEmployeeData(updatedEmployees);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleLeaveDropdown = (index) => {
    setLeaveDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleHiredStatusChange = (index, value) => {
    const updatedEmployees = [...employeeData];
    updatedEmployees[index].hiredStatus = value;
    setEmployeeData(updatedEmployees);
  };

  const handleLeaveStatusChange = (index, value) => {
    const updatedEmployees = [...employeeData];
    updatedEmployees[index].leaveStatus = value;
    setEmployeeData(updatedEmployees);
  };

  const toggleLike = (index) => {
    const updatedEmployees = [...employeeData];
    updatedEmployees[index].isliked = !updatedEmployees[index].isliked;
    setEmployeeData(updatedEmployees);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Employee Overview</h3>

      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={openModal}>Submit Resume</button>
        <button className="btn btn-primary" onClick={openModalJob}>Create Job Opening</button>
        <button className="btn btn-primary" onClick={openModalCom}>Enter Company Info</button>
      </div>
      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Position Requested</th>
            <th>Recommended Position</th>
            <th>Salary</th>
            <th>Hired Status</th>
            <th>Starting Date</th>
            <th>Leave Status</th>
            <th>Peers Review</th>
            <th>Position Requested Compatibility (%)</th>
            <th>Company Compatibility (%)</th>
            <th>Like</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td><Link href={`/employees/details?id=${employee.id}`}>{employee.name}</Link></td>
              <td><Link href={`/employees/details?id=${employee.id}`}>{employee.lastname}</Link></td>
              <td>{employee.positionRequested}</td>
              <td>{employee.recommendedPosition}</td>
              <td>
                {editingSalary === index ? (
                  <Input
                    type="text"
                    value={employee.salary}
                    onChange={(e) => handleSalaryChange(index, e.target.value)}
                    onBlur={() => setEditingSalary(null)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setEditingSalary(index)}>{employee.salary}</span>
                )}
              </td>
              <td>
                <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
                  <DropdownToggle caret>
                    {employee.hiredStatus}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleHiredStatusChange(index, 'Hired')}>Hired</DropdownItem>
                    <DropdownItem onClick={() => handleHiredStatusChange(index, 'Not Hired')}>Not Hired</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
              <td>
                {editingStartDate === index ? (
                  <Input
                    type="date"
                    value={employee.startDate}
                    onChange={(e) => handleStartDateChange(index, e.target.value)}
                    onBlur={() => setEditingStartDate(null)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setEditingStartDate(index)}>{employee.startDate}</span>
                )}
              </td>
              <td>
                <Dropdown isOpen={leaveDropdownOpen[index]} toggle={() => toggleLeaveDropdown(index)}>
                  <DropdownToggle caret>
                    {employee.leaveStatus}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleLeaveStatusChange(index, 'None')}>None</DropdownItem>
                    <DropdownItem onClick={() => handleLeaveStatusChange(index, 'Quit')}>Quit</DropdownItem>
                    <DropdownItem onClick={() => handleLeaveStatusChange(index, 'Fired')}>Fired</DropdownItem>
                    <DropdownItem onClick={() => handleLeaveStatusChange(index, 'Emergency')}>Emergency</DropdownItem>
                    <DropdownItem onClick={() => handleLeaveStatusChange(index, 'Other')}>Other</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
              <td>{employee.peersReview.toFixed(2)}</td>
              <td>{employee.positionRequestedCompatibility.toFixed(2)}%</td>
              <td>{employee.companyCompatibility.toFixed(2)}%</td>
              <td>
                <button onClick={() => toggleLike(index)}>
                  {employee.isliked ? '👍' : '👎'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SimpleModal isOpen={isModalOpen} onClose={closeModal}>
        <FileUpload />
      </SimpleModal>
      <SimpleModal isOpen={isModalOpenJob} onClose={closeModalJob}>
        <JobOpeningForm closeModal={closeModalJob} />
      </SimpleModal>
      <SimpleModal isOpen={isModalOpenCom} onClose={closeModalCom}>
        <CompanyFormModal closeModal={closeModalCom} />
      </SimpleModal>
    </div>
  );
}
