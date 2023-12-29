import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { EmployeeI } from "../types/EmployeeI";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { trpc } from "../trpc";
import { DepartmentI } from "../types/DepartmentI";

const EmployeeTable: React.FC<{
    state: EmployeeI[];
    isAddEmployeeByttonHiden: boolean;
}> = ({ state, isAddEmployeeByttonHiden }) => {
    const [showModal, setShowModal] = useState(false);

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [departmentIdInput, setdepartmentIdInput] = useState(0);
    const [jobTitleInput, setJobTitleInput] = useState("");
    const [isHeadInput, setIsHeadInput] = useState(false);

    const [departments, setDepartments] = useState<DepartmentI[]>([]);
    const [departmentChoise, setDepartmentChoise] = useState("Depatrments:");

    useEffect(() => {
        trpc.department.getDepartments.query().then((arr: DepartmentI[]) => {
            setDepartments(arr);
        });
    }, [departments]);

    const addEmployee = async () => {
        setNameInput("");
        setEmailInput("");
        setdepartmentIdInput(0);
        setJobTitleInput("");
        setIsHeadInput(false);

        await trpc.employee.createEmployee.query({
            email: emailInput,
            fullName: nameInput,
            departmentsId: departmentIdInput,
            jobTitle: jobTitleInput,
            isHead: isHeadInput,
        });
    };

    return (
        <>
            {" "}
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
                                {departments.map((department) => {
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
                    <Button variant="success" onClick={addEmployee}>
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
