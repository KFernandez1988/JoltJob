"use client"

import React, { useState } from "react";
import { Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

export default function EmployeeDetailClient({ employee }) {
    const [editableEmployee, setEditableEmployee] = useState(employee);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [leaveDropdownOpen, setLeaveDropdownOpen] = useState(false);
    const [likes, setLikes] = useState(false);


    const [editingField, setEditingField] = useState(null);

    const handleInputChange = (field, value) => {
        setEditableEmployee({ ...editableEmployee, [field]: value });
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleLeaveDropdown = () => setLeaveDropdownOpen(!leaveDropdownOpen);

    const handleLike = () => {
        setLikes(!likes);
    };

    const renderEditableField = (field, label, isEditable = true) => (
        <p>
            <strong>{label}: </strong>
            {editingField === field ? (
                <Input
                    type="text"
                    value={editableEmployee[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    autoFocus
                />
            ) : (
                <span onClick={() => isEditable && setEditingField(field)}>
                    {editableEmployee[field]}
                </span>
            )}
        </p>
    );

    return (
        <div className="container mt-5">
            <h2>
                {renderEditableField("name", "First Name")}
            </h2>
            <h2>
                {renderEditableField("lastname", "Last Name")}
            </h2>


            {renderEditableField("positionRequested", "Position Requested")}
            {renderEditableField("recommendedPosition", "Recommended Position")}

            {renderEditableField("salary", "Salary")}

            <p>
                <strong>Hired Status: </strong>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>{editableEmployee.hiredStatus}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleInputChange("hiredStatus", "Hired")}>Hired</DropdownItem>
                        <DropdownItem onClick={() => handleInputChange("hiredStatus", "Not Hired")}>Not Hired</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </p>

            <p>
                <strong>Starting Date: </strong>
                <Input
                    type="date"
                    value={editableEmployee.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
            </p>

            <p>
                <strong>Leave Status: </strong>
                <Dropdown isOpen={leaveDropdownOpen} toggle={toggleLeaveDropdown}>
                    <DropdownToggle caret>{editableEmployee.leaveStatus}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleInputChange("leaveStatus", "None")}>None</DropdownItem>
                        <DropdownItem onClick={() => handleInputChange("leaveStatus", "Quit")}>Quit</DropdownItem>
                        <DropdownItem onClick={() => handleInputChange("leaveStatus", "Fired")}>Fired</DropdownItem>
                        <DropdownItem onClick={() => handleInputChange("leaveStatus", "Emergency")}>Emergency</DropdownItem>
                        <DropdownItem onClick={() => handleInputChange("leaveStatus", "Other")}>Other</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </p>


            {renderEditableField("peersReview", "Peers Review", false)}

            {renderEditableField("positionRequestedCompatibility", "Position Requested Compatibility (%)", false)}

            {renderEditableField("companyCompatibility", "Company Compatibility (%)", false)}

            <Button color="primary" onClick={handleLike}>
                Like {likes ? '👍' : ''}
            </Button>
        </div>
    );
}
