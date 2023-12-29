import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { trpc } from "../trpc";
import { EmployeeI } from "../types/EmployeeI";
import { DepartmentI } from "../types/DepartmentI";
import DepartmentTable from "./DepartmentTable";
import style from "./styles/DitailsWrapper.module.scss";
import { Button, Table } from "react-bootstrap";

const DepartmentsDitails: React.FC<{
    departmentId: number;
    hideDitails: () => void;
    setrefreshPage: (value: boolean) => void;
}> = (props) => {
    const [employees, setEployees] = useState<EmployeeI[]>([]);
    const [department, setDepartment] = useState<DepartmentI | null>(null);

    useEffect(() => {
        trpc.employee.getEmployeesByDepartment
            .query(props.departmentId)
            .then((obj: EmployeeI[]) => {
                setEployees(obj);
            });
        trpc.department.getDepartmentById
            .query(props.departmentId)
            .then((department) => {
                setDepartment(department);
            });
    }, []);

    return (
        <div>
            <h1>Department ditails:</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Department id:</th>
                        <th>Department name:</th>
                        <th>Department employees count:</th>
                        <th>Department description:</th>
                        <th>Department created date:</th>
                        <th>Department updated date:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={department?.id}>
                        <td>{department?.id}</td>
                        <td>{department?.name}</td>
                        <td>{department?.employeesCount}</td>
                        <td>{department?.description}</td>
                        <td>{department?.createdAt}</td>
                        <td>{department?.updatedAt}</td>
                    </tr>
                </tbody>
            </Table>
            <h2>Employees list:</h2>
            <EmployeeTable
                state={employees}
                isAddEmployeeByttonHiden={true}
                setRefreshPage={props.setrefreshPage}
            />
            <br />
            <Button variant="warning" onClick={props.hideDitails}>
                Return to all departments
            </Button>{" "}
            <br />
        </div>
    );
};

export default DepartmentsDitails;
