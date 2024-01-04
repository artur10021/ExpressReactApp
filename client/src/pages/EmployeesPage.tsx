import React from "react";
import Header from "../components/Header";
import EmployeesList from "../components/EmployeesList";

const EmployeesPage: React.FC = () => {
    return (
        <div>
            <Header />
            <EmployeesList />
        </div>
    );
};

export default EmployeesPage;
