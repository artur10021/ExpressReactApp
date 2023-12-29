import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { DepartmentI } from "../types/DepartmentI";
import { trpc } from "../trpc";
import DepartmentsDitails from "./DepartmentsDitails";
import { Button, Modal } from "react-bootstrap";

const DepartmentTable: React.FC = () => {
    const [showDepartmentDitails, setShowDepartmentDitails] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    const [idOfDepartmentDitails, setIdOfDepartmentDitails] =
        useState<number>(0);

    const [departments, setDepartments] = useState<DepartmentI[]>([]);

    useEffect(() => {
        trpc.department.getDepartments.query().then((depArr) => {
            setDepartments(depArr);
        });
    }, [departments]);

    const removeDepartment = async (id: number) => {
        await trpc.department.removeDepatrmentById.query(id);
    };

    const hideDitails = () => {
        setShowDepartmentDitails(false);
    };

    const showDitails = (id: number) => {
        setIdOfDepartmentDitails(id);
        setShowDepartmentDitails(true);
    };

    return showDepartmentDitails ? (
        <DepartmentsDitails
            departmentId={idOfDepartmentDitails}
            hideDitails={hideDitails}
        />
    ) : (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Department id:</th>
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
                            onDoubleClick={() => {
                                showDitails(department.id);
                            }}
                        >
                            <td>{index + 1}</td>
                            <td>{department.id}</td>
                            <td>{department.name}</td>
                            <td>{department.employeesCount}</td>
                            <td>{department.description}</td>
                            <td>{department.createdAt}</td>
                            <Button
                                variant="outline-danger"
                                onClick={() => removeDepartment(department.id)}
                            >
                                Remove
                            </Button>{" "}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default DepartmentTable;
