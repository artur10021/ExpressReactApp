import React from "react";
import Header from "../components/Header";
import TableComp from "../components/DepartmentTable";
import { Outlet, Route, Routes } from "react-router-dom";
import DepartmentsDitails from "../components/DepartmentsDitails";
import DepartmentsList from "../components/DepartmentsList";

const DepartmentsPage: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Departments:</h1>
            <DepartmentsList />
            {/* <Outlet /> */}
        </div>
    );
};

export default DepartmentsPage;
