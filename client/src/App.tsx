import { useEffect } from "react";
import "./App.css";
import { trpc } from "./trpc";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DepartmentsPage from "./pages/DepartmentsPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDitails from "./components/EmployeeDitails";

function App() {
    useEffect(() => {
        trpc.employee.getFiveLastAddedEmployees.query().then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/departments" element={<DepartmentsPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="employeeName" element={<EmployeeDitails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
