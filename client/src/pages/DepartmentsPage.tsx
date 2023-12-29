import React from "react";
import Header from "../components/Header";
import DepartmentTable from "../components/DepartmentTable";
import DepartmentList from "../components/DepartmentList";

const DepartmentsPage: React.FC = () => {
    return (
        <div>
            <Header />

            <DepartmentList />
        </div>
    );
};

export default DepartmentsPage;
