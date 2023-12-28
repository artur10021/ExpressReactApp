import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { EmployeeI } from "../types/EmployeeI";

const EmployeeTable: React.FC<{ state: EmployeeI[] }> = ({ state }) => {
    console.log(state);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Employee Email:</th>
                    <th>Employee Full Name:</th>
                    <th>Department id:</th>
                    <th>Employee Job Title:</th>
                    <th>Is Employee Head Of Department:</th>
                </tr>
            </thead>
            <tbody>
                {state.map((employee, index) => (
                    <tr key={employee.id}>
                        <td>{index + 1}</td>
                        <td>{employee.email}</td>
                        <td>{employee.fullName}</td>
                        <td>{employee.departmentsId}</td>
                        <td>{employee.jobTitle}</td>
                        <td>{employee.isHead ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EmployeeTable;
