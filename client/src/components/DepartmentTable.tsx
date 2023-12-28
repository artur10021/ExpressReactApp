import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { DepartmentI } from "../types/DepartmentI";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../trpc";
import DepartmentsDitails from "./DepartmentsDitails";

const DepartmentTable: React.FC = () => {
    // const navigate = useNavigate();

    const [showDepartmentDitails, setShowDepartmentDitails] = useState(false);
    const [idOfDepartmentDitails, setIdOfDepartmentDitails] =
        useState<number>(0);

    const [departments, setDepartments] = useState<DepartmentI[]>([]);

    useEffect(() => {
        trpc.department.getDepartments.query().then((depArr) => {
            setDepartments(depArr);
        });
    }, []);

    const showDitails = (id: number) => {
        console.log("object");
        setIdOfDepartmentDitails(id);
        setShowDepartmentDitails(true);

        // navigate("/departmentDitails");
    };

    return showDepartmentDitails ? (
        <DepartmentsDitails departmentId={idOfDepartmentDitails} />
    ) : (
        <>
            <h2>Departments list:</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Department Name:</th>
                        <th>Employees Count:</th>
                        <th>Description:</th>
                        <th>Date Of Creation:</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department, index: number) => (
                        <tr
                            key={department.id}
                            onDoubleClick={() => showDitails(department.id)}
                        >
                            <td>{index + 1}</td>
                            <td>{department.name}</td>
                            <td>{department.employeesCount}</td>
                            <td>{department.description}</td>
                            <td>{department.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default DepartmentTable;
