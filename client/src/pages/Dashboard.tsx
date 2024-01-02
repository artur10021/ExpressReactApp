import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DepartmentTable from "../components/DepartmentTable";
import { trpc } from "../trpc";
import { DepartmentI } from "../types/DepartmentI";
import { EmployeeI } from "../types/EmployeeI";
import EmployeeTable from "../components/EmployeeTable";

const Dashboard: React.FC = () => {
    const [topDepartments, setTopDepartments] = useState<DepartmentI[]>([]);
    const [topEmployees, setTopEployees] = useState<EmployeeI[]>([]);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        trpc.department.getTopFiveDepartmentsByEmployeesCount
            .query()
            .then((DepArr) => {
                setTopDepartments(DepArr);
            });

        trpc.employee.getFiveLastAddedEmployees
            .query()
            .then((emplArr: EmployeeI[]) => {
                setTopEployees(emplArr);
            });
    }, [refreshPage]);
    return (
        <div>
            <Header />
            <h1>Dashboard:</h1>
            <div>
                <strong>Top 5 departments by number of employees</strong>
                <DepartmentTable
                    departments={topDepartments}
                    isAddDepartmentButtonHidden={true}
                />
                <br />
                <strong>5 most recently added employees;</strong>
                <EmployeeTable
                    state={topEmployees}
                    isAddEmployeeByttonHiden={true}
                    setRefreshPage={setRefreshPage}
                />
            </div>
        </div>
    );
};

export default Dashboard;
