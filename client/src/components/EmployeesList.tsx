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
    }, []);

    return <div>{<EmployeeTable state={employees} />}</div>;
};

export default EmployeesList;
