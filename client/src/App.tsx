import React, { useEffect } from "react";
import "./App.css";
import { trpc } from "./trpc";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DepartmentsPage from "./pages/DepartmentsPage";
import EmployeesPage from "./pages/EmployeesPage";
import DepartmentsDitails from "./components/DepartmentsDitails";
import DepartmentsList from "./components/DepartmentsList";
import EmployeesList from "./components/EmployeesList";
import EmployeeDitails from "./components/EmployeeDitails";

function App() {
    useEffect(() => {
        // //creating department
        // trpc.department.createDepartment.query({
        //     name: "JavaScript ",
        //     employeesCount: 10,
        //     description: "JavaScript department ",
        // });
        // //creating employee
        // trpc.employee.createEmployee.query({
        //     email: "alexander@gmail.com",
        //     fullName: "Alexander Hirika",
        //     departmentsId: 1,
        //     jobTitle: "JavaScript developer",
        //     isHead: false,
        // });
        // console.log(trpc.department.getDepartments.query());
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/departments/*" element={<DepartmentsPage />}>
                        <Route
                            path="departmentName"
                            element={<DepartmentsDitails />}
                        />
                    </Route>
                    <Route path="/employees/*" element={<EmployeesPage />}>
                        <Route
                            path="employeeName"
                            element={<EmployeeDitails />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
