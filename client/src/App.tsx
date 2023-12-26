import React, { useEffect } from "react";
import "./App.css";
import { trpc } from "./trpc";

function App() {
  useEffect(() => {
    //creating department
    trpc.department.createDepartment.query({
      name: "JavaScript ",
      employeesCount: 10,
      description: "JavaScript department ",
    });

    //creating employee
    trpc.employee.createEmployee.query({
      email: "alexander@gmail.com",
      fullName: "Alexander Hirika",
      departmentsId: 1,
      jobTitle: "JavaScript developer",
      isHead: false,
    });
    console.log(trpc.department.getDepartments.query());
  }, []);

  return <div className="App">hellow world</div>;
}

export default App;
