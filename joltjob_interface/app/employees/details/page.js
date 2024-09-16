import EmployeeDetailClient from "./EmployeeDetailClient";


const employeeData = [
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
      companyCompatibility: 85.5,
      isliked: false
    },
  ];

export default function Page({ searchParams }) {
    console.log('searchParams',searchParams);
    const { id } = searchParams; 


    const employee = employeeData.find((emp) => emp.id === Number(id));
  
    if (!employee) {
        return <div>Employee not found</div>;
      }
    
      return (
        <div>
          <h2>Employee Details</h2>
          <EmployeeDetailClient employee={employee} />
        </div>
      );
  }
