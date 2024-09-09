"use client";

import { Button, Nav, NavItem } from "reactstrap";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navigation = [
  {
    title: "DASHBOARD",
    href: "/",
    icon: "bi bi-pie-chart",
  },
  {
    title: "EMPLOYEES",
    href: "/employees",
    icon: "bi bi-people",
  },
  {
    title: "BUSINESS",
    href: "/business",
    icon: "bi bi-shop",
  },
  {
    title: "FINANZAS",
    href: "/finanzas",
    icon: "bi bi-cash",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const location = usePathname();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={showMobilemenu}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                href={navi.href}
                className={
                  location === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
