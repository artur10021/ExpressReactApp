import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { trpc } from "../trpc";

const DepartmentModalForm: React.FC<{
    showModal: boolean;
    setShowModal: (arg: boolean) => void;
    setRefreshPage: () => void;
}> = ({ showModal, setShowModal, setRefreshPage }) => {
    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const createDepartment = trpc.department.createDepartment.useMutation({
        onSuccess: () => {
            setDescriptionInput("");
            setNameInput("");
            setRefreshPage();
        },
    });

    return (
        <div>
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
        </div>
    );
};

export default DepartmentModalForm;
