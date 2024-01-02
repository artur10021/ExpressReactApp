import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { EmployeeI } from "../types/EmployeeI";
import { trpc } from "../trpc";
import EmployeeTable from "./EmployeeTable";
import { Button, Form, InputGroup } from "react-bootstrap";

const EmployeesList: React.FC = () => {
    const [employees, setEployees] = useState<EmployeeI[]>([]);
    const [refreshPage, setRefreshPage] = useState(false);

    const [filterInput, setFilterInput] = useState("");

    useEffect(() => {
        trpc.employee.getEmployees.query().then((obj: EmployeeI[]) => {
            setEployees(obj);
        });
    }, [refreshPage]);

    useEffect(() => {
        if (!filterInput) {
            setRefreshPage(!refreshPage);
        } else {
            getFilteredEmployees(filterInput.trim());
        }
    }, [filterInput]);

    const getFilteredEmployees = async (value: string) => {
        await trpc.employee.getFilteredByNameEmployees
            .query(value)
            .then((employees) => {
                console.log(employees);
                setEployees(employees);
            });
    };

    return (
        <div>
            <h1>Employees List:</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="filter by username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={filterInput}
                    onChange={(e) => {
                        setFilterInput(e.currentTarget.value);
                    }}
                />
            </InputGroup>
            <EmployeeTable
                state={employees}
                isAddEmployeeByttonHiden={false}
                setRefreshPage={() => setRefreshPage(!refreshPage)}
            />
        </div>
    );
};

export default EmployeesList;
