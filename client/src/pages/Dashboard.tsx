import React from "react";
import Header from "../components/Header";
import TableComp from "../components/DepartmentTable";

const Dashboard: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            <div>
                <strong>Top 5 departments by number of employees</strong>
                <TableComp />
                <br />
                <strong>5 most recently added employees;</strong>
                <TableComp />
            </div>
        </div>
    );
};

export default Dashboard;
