import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import EmployeesList from "../components/EmployeesList";

const EmployeesPage: React.FC = () => {
    return (
        <div>
            <Header />
            <EmployeesList />
            <Outlet />
        </div>
    );
};

export default EmployeesPage;
