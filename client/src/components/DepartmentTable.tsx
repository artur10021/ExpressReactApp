import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { trpc, RouterOutputs } from "../trpc";
import DepartmentsDitails from "./DepartmentsDitails";
import { Button, Modal } from "react-bootstrap";

type GetDepartmentsOutput = RouterOutputs["department"]["getDepartments"];

const DepartmentTable: React.FC<{
    setRefreshPage: () => void;
    isAddDepartmentButtonHidden: boolean;
    departments: GetDepartmentsOutput | undefined;
}> = ({ isAddDepartmentButtonHidden, departments, setRefreshPage }) => {
    const [showDepartmentDitails, setShowDepartmentDitails] = useState(false);
    const [idOfDepartmentDitails, setIdOfDepartmentDitails] =
        useState<number>(0);

    const [showModal, setShowModal] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const createDepartment = trpc.department.createDepartment.useMutation({
        onSuccess: () => {
            setDescriptionInput("");
            setNameInput("");
            setRefreshPage();
        },
    });

    const removeDepartment = trpc.department.removeDepatrmentById.useMutation({
        onSuccess: () => {
            setShowDepartmentDitails(false);
            setRefreshPage();
        },
    });

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
            setRefreshPage={setRefreshPage}
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
                    {departments?.map((department, index: number) => (
                        <tr
                            key={department?.id}
                            onDoubleClick={() => {
                                showDitails(department?.id);
                            }}
                        >
                            <td>{index + 1}</td>
                            <td>{department?.id}</td>
                            <td>{department?.name}</td>
                            <td>{department?.employeesCount}</td>
                            <td>{department?.description}</td>
                            <td>{department?.createdAt}</td>
                            <Button
                                variant="outline-danger"
                                onClick={() =>
                                    removeDepartment.mutate(department?.id)
                                }
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
                            createDepartment.mutate({
                                name: nameInput,
                                description: descriptionInput,
                            });
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
