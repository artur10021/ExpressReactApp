import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { EmployeeI } from "../types/EmployeeI";
import { trpc } from "../trpc";
import EmployeeTable from "./EmployeeTable";

const EmployeesList: React.FC = () => {
    const [employees, setEployees] = useState<EmployeeI[]>([]);

    useEffect(() => {
        trpc.employee.getEmployees.query().then((obj: EmployeeI[]) => {
            setEployees(obj);
        });
    }, [employees]);

    return (
        <div>
            <h1>Employees List:</h1>
            <EmployeeTable state={employees} isAddEmployeeByttonHiden={false} />
        </div>
    );
};

export default EmployeesList;
