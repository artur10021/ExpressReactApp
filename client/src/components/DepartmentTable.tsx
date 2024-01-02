import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { DepartmentI } from "../types/DepartmentI";
import { trpc } from "../trpc";
import DepartmentsDitails from "./DepartmentsDitails";
import { Button, Modal } from "react-bootstrap";

const DepartmentTable: React.FC<{
    isAddDepartmentButtonHidden: boolean;
    departments: DepartmentI[];
}> = ({ isAddDepartmentButtonHidden, departments }) => {
    const [showDepartmentDitails, setShowDepartmentDitails] = useState(false);
    const [idOfDepartmentDitails, setIdOfDepartmentDitails] =
        useState<number>(0);

    const [showModal, setShowModal] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const [refreshPage, setrefreshPage] = useState<boolean>(false);

    const createDepartment = () => {
        setDescriptionInput("");
        setNameInput("");
        setrefreshPage(true);
        trpc.department.createDepartment.mutate({
            name: nameInput,
            description: descriptionInput,
        });
    };

    const removeDepartment = async (id: number) => {
        await trpc.department.removeDepatrmentById.mutate(id);
        setrefreshPage(!refreshPage);
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
            setrefreshPage={setrefreshPage}
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
            <Button
                hidden={isAddDepartmentButtonHidden}
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
                    <Button
                        variant="success"
                        onClick={() => {
                            createDepartment();
                            setrefreshPage(true);
                        }}
                    >
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
        </>
    );
};

export default DepartmentTable;
