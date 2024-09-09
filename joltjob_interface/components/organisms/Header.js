"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const router = useRouter();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error("Failed to logout:", await response.text());
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Navbar color="white" light expand="md" className="fix-header">
    <div className="d-flex align-items-center">
 
      <div className="d-lg-block d-none me-5 pe-3">
        <Logo />
      </div>
      <NavbarBrand href="/">
        <Image
          src="/images/ICONLOGO.svg"
          alt="JOLTJOB Logo"
          width={150}  
          height={50}  
        />
      </NavbarBrand>
      
      <Button
        color="primary"
        className="d-lg-none"
        onClick={showMobilemenu}
      >
        <i className="bi bi-list"></i>
      </Button>
    </div>


    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ms-auto">
      <DropdownToggle color="transparent">
        <Image
          src="/images/users/user4.jpg"
          alt="profile"
          className="rounded-circle"
          width={30}  
          height={30}  
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Navbar>
  );
};

export default Header;
