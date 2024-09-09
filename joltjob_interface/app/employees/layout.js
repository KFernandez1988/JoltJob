import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import { Container } from "reactstrap";

export default function layout({children}) {
  return (
    <main>
       
    <Header />
    <div className="pageWrapper d-lg-flex">
    
      <aside className="sidebarArea shadow" id="sidebarArea">
        <Sidebar />
      </aside>
    
      <div className="contentArea">

        <Container className="p-4" fluid>
          {children}
        </Container>
      </div>
    </div>
  </main>
  );
}