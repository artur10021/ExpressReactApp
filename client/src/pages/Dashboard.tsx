import React, { useState } from "react";
import Header from "../components/Header";
import DepartmentTable from "../components/DepartmentTable";
import { trpc } from "../trpc";
import EmployeeTable from "../components/EmployeeTable";

const Dashboard: React.FC = () => {
    const [refreshPage, setRefreshPage] = useState(false);

    const topDepartments =
        trpc.department.getTopFiveDepartmentsByEmployeesCount.useQuery().data;

    const fiveLastAddedEmployees =
        trpc.employee.getFiveLastAddedEmployees.useQuery().data;

    return (
        <div>
            <Header />
            <h1>Dashboard:</h1>
            <div>
                <strong>Top 5 departments by number of employees</strong>
                <DepartmentTable
                    setRefreshPage={() => {
                        setRefreshPage(!refreshPage);
                    }}
                    departments={topDepartments}
                    isAddDepartmentButtonHidden={true}
                />
                <br />
                <strong>5 most recently added employees;</strong>
                <EmployeeTable
                    state={fiveLastAddedEmployees}
                    isAddEmployeeByttonHiden={true}
                    setRefreshPage={() => {
                        setRefreshPage(!refreshPage);
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
