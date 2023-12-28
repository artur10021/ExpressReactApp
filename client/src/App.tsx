import React, { useEffect } from "react";
import "./App.css";
import { trpc } from "./trpc";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DepartmentsPage from "./pages/DepartmentsPage";
import EmployeesPage from "./pages/EmployeesPage";

import EmployeeDitails from "./components/EmployeeDitails";
import DepartmentsDitails from "./components/DepartmentsDitails";

function App() {
    useEffect(() => {
        // //creating department
        // trpc.department.createDepartment.query({
        //     name: "Java",
        //     employeesCount: 15,
        //     description: "Java department ",
        // });
        // //creating employee
        // trpc.employee.createEmployee.query({
        //     email: "test@gmail.com",
        //     fullName: "test Zhmalik",
        //     departmentsId: 1,
        //     jobTitle: "JS React developer",
        //     isHead: false,
        // });
        // console.log(trpc.department.getDepartments.query());

        trpc.employee.getFiveLastAddedEmployees.query().then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <div className="App">
            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/departments/*" element={<DepartmentsPage />}>
                        <Route
                            path="departmentDitails"
                            element={<DepartmentsDitails />}
                        />
                    </Route>
                    <Route path="/employees/*" element={<EmployeesPage />} />
                    <Route path="employeeName" element={<EmployeeDitails />} />
                </Routes>
            </BrowserRouter> */}

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/departments" element={<DepartmentsPage />} />
                    {/* <Route
                        path="/departmentDitails"
                        element={<DepartmentsDitails departmentId={0} />}
                    /> */}
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="employeeName" element={<EmployeeDitails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
