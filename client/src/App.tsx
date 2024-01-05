import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DepartmentsPage from "./pages/DepartmentsPage";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/departments" element={<DepartmentsPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
