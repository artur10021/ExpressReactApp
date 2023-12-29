import React, { useEffect, useState } from "react";
import { EmployeeI } from "../types/EmployeeI";
import { trpc } from "../trpc";
import DepartmentTable from "./DepartmentTable";
import { Button, Modal } from "react-bootstrap";

const DepartmentList: React.FC = () => {
    // const [employees, setEployees] = useState<EmployeeI[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    // useEffect(() => {
    //     trpc.employee.getEmployees.query().then((obj: EmployeeI[]) => {
    //         setEployees(obj);
    //     });
    // }, []);

    const createDepartment = () => {
        setDescriptionInput("");
        setNameInput("");
        trpc.department.createDepartment.query({
            name: nameInput,
            description: descriptionInput,
        });
    };

    return (
        <div>
            <h1>Department List:</h1>
            <DepartmentTable />
            <br />
            <Button
                hidden={isHidden}
                variant="info"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Add new department
            </Button>{" "}
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Department Adding
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Department name:</p>
                        <input
                            placeholder="name"
                            value={nameInput}
                            onChange={(e) => {
                                setNameInput(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <br />
                    <div>
                        <p>Department description:</p>

                        <input
                            placeholder="description"
                            value={descriptionInput}
                            onChange={(e) => {
                                setDescriptionInput(e.currentTarget.value);
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={createDepartment}>
                        Create department
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
        </div>
    );
};

export default DepartmentList;
