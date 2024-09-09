"use client"

import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import Image from "next/image";
import Link from "next/link";
import Script from 'next/script';
import { Container } from "reactstrap";

export default function Home() {
  return (
    <main>
       
    <Header />
    <div className="pageWrapper d-lg-flex">
    
      <aside className="sidebarArea shadow" id="sidebarArea">
        <Sidebar />
      </aside>
    
      <div className="contentArea">

        <Container className="p-4" fluid>
        <div id="main">
      <h1>hello</h1>
    </div>
        </Container>
      </div>
    </div>
  </main>
    
  );
}
