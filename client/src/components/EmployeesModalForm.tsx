import React, { useState } from "react";
import { Modal, Dropdown, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { RouterOutputs, trpc } from "../trpc";

interface IEmployeeForm {
    email: string;
    fullName: string;
    departmentId: number;
    jobTitle: string;
    isHead: boolean;
}

type GetDepartmentsOutput = RouterOutputs["department"]["getDepartments"];

const EmployeesModalForm: React.FC<{
    departments: GetDepartmentsOutput | undefined;
    showModal: boolean;
    setShowModal: (arg: boolean) => void;
    setRefreshPage: () => void;
}> = ({ setRefreshPage, departments, showModal, setShowModal }) => {
    const { register, handleSubmit, setValue } = useForm<IEmployeeForm>();

    const onSubmit: SubmitHandler<IEmployeeForm> = (data) => {
        addEmployee.mutate({
            departmentsId: data.departmentId,
            email: data.email,
            isHead: data.isHead,
            jobTitle: data.jobTitle,
            fullName: data.fullName,
        });
    };

    const [departmentChoise, setDepartmentChoise] = useState("Depatrments:");
    const addEmployee = trpc.employee.createEmployee.useMutation({
        onSuccess: () => {
            setRefreshPage();
            setDepartmentChoise("Depatrments:");
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("fullName")}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Employee email:</p>
                            <input
                                placeholder="email"
                                type="email"
                                {...register("email")}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Choose department:</p>

                            <Dropdown {...register("departmentId")}>
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
                                                        setValue(
                                                            "departmentId",
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
                            <input
                                type="hidden"
                                {...register("departmentId")}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Employee job title:</p>
                            <input
                                {...register("jobTitle")}
                                placeholder="job title"
                            />
                        </div>
                        <br />
                        <div>
                            <p>Is emploeer a head of department?</p>
                            <input type="checkbox" {...register("isHead")} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="success">
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
                </form>
            </Modal>
        </div>
    );
};

export default EmployeesModalForm;
