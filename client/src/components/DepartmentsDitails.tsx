import React from "react";
import EmployeeTable from "../components/EmployeeTable";
import { trpc } from "../trpc";

import { Button, Table } from "react-bootstrap";

const DepartmentsDitails: React.FC<{
    departmentId: number;
    hideDitails: () => void;
    setRefreshPage: () => void;
}> = (props) => {
    const employees = trpc.employee.getEmployees.useQuery().data;
    const department = trpc.department.getDepartmentById.useQuery(
        props.departmentId
    ).data;

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
                setRefreshPage={props.setRefreshPage}
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
