import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { trpc } from "../trpc";

const EmployeeTable: React.FC<{
    state: any;
    isAddEmployeeByttonHiden: boolean;
    setRefreshPage: () => void;
}> = ({ state, isAddEmployeeByttonHiden, setRefreshPage }) => {
    const [showModal, setShowModal] = useState(false);

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [departmentIdInput, setdepartmentIdInput] = useState(0);
    const [jobTitleInput, setJobTitleInput] = useState("");
    const [isHeadInput, setIsHeadInput] = useState(false);

    const [departmentChoise, setDepartmentChoise] = useState("Depatrments:");

    const departments = trpc.department.getDepartments.useQuery().data;

    const removeEmployee = trpc.employee.removeEmployeeById.useMutation({
        onSuccess: () => setRefreshPage(),
    });

    const addEmployee = trpc.employee.createEmployee.useMutation({
        onSuccess: () => {
            setNameInput("");
            setEmailInput("");
            setdepartmentIdInput(0);
            setJobTitleInput("");
            setIsHeadInput(false);
            setRefreshPage();
        },
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
                    {state?.map((employee: any, index: number) => {
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
                                <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                        removeEmployee.mutate(employee.id);
                                    }}
                                >
                                    Remove
                                </Button>{" "}
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
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Epmloyee Adding
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Employee full name:</p>
                        <input
                            placeholder="full name"
                            value={nameInput}
                            onChange={(e) => {
                                setNameInput(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <br />

                    <div>
                        <p>Employee email:</p>
                        <input
                            placeholder="email"
                            type="email"
                            value={emailInput}
                            onChange={(e) => {
                                setEmailInput(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <br />
                    <div>
                        <p>Choose department:</p>

                        <Dropdown>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {departmentChoise}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {departments?.map((department) => {
                                    return (
                                        <>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    setdepartmentIdInput(
                                                        department.id
                                                    );
                                                    setDepartmentChoise(
                                                        department.name
                                                    );
                                                }}
                                            >
                                                Department name:{" "}
                                                {department.name}
                                            </Dropdown.Item>
                                        </>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <br />
                    <div>
                        <p>Employee job title:</p>
                        <input
                            placeholder="job title"
                            value={jobTitleInput}
                            onChange={(e) => {
                                setJobTitleInput(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <br />
                    <div>
                        <p>Is emploeer a head of department?</p>
                        <input
                            type="checkbox"
                            checked={isHeadInput}
                            onChange={(e) => {
                                setIsHeadInput(e.currentTarget.checked);
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => {
                            addEmployee.mutate({
                                email: emailInput,
                                fullName: nameInput,
                                departmentsId: departmentIdInput,
                                jobTitle: jobTitleInput,
                                isHead: isHeadInput,
                            });
                        }}
                    >
                        Add employee
                    </Button>{" "}
                    <Button
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EmployeeTable;
