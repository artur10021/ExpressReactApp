import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { trpc, type RouterOutputs } from "../trpc";
import EmployeesModalForm from "./EmployeesModalForm";

type GetEmployeesOutput =
    RouterOutputs["employee"]["getEmployeesWithNameFilter"];

const EmployeeTable: React.FC<{
    state: GetEmployeesOutput | undefined;
    isAddEmployeeByttonHiden: boolean;
    setRefreshPage: () => void;
}> = ({ state, isAddEmployeeByttonHiden, setRefreshPage }) => {
    const [showModal, setShowModal] = useState(false);

    const departments = trpc.department.getDepartments.useQuery().data;

    const removeEmployee = trpc.employee.removeEmployeeById.useMutation({
        onSuccess: () => setRefreshPage(),
    });

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee Email:</th>
                        <th>Employee Full Name:</th>
                        <th>Department id / name:</th>
                        <th>Employee Job Title:</th>
                        <th>Is Employee Head Of Department:</th>
                        <th>Date of creation:</th>
                        <th>Date of updating:</th>
                    </tr>
                </thead>
                <tbody>
                    {state?.map((employee, index: number) => {
                        const department = departments?.find(
                            (dep) => dep.id === employee.departmentsId
                        );

                        return (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.email}</td>
                                <td>{employee.fullName}</td>
                                <td>
                                    {employee.departmentsId} /{" "}
                                    {department?.name}
                                </td>
                                <td>{employee.jobTitle}</td>
                                <td>{employee.isHead ? "Yes" : "No"}</td>
                                <td>{employee.createdAt}</td>
                                <td>{employee.updatedAt}</td>
                                <td>
                                    {" "}
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                            removeEmployee.mutate(employee.id);
                                        }}
                                    >
                                        Remove
                                    </Button>{" "}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br />
            <Button
                variant="info"
                hidden={isAddEmployeeByttonHiden}
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Add new employee
            </Button>{" "}
            <EmployeesModalForm
                departments={departments}
                setRefreshPage={setRefreshPage}
                setShowModal={setShowModal}
                showModal={showModal}
            />
        </>
    );
};

export default EmployeeTable;
