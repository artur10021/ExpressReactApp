import React from "react";
import Header from "../components/Header";
import DepartmentTable from "../components/DepartmentTable";

const DepartmentsPage: React.FC = () => {
    return (
        <div>
            <Header />

            <DepartmentTable />
        </div>
    );
};

export default DepartmentsPage;
