import React, { useEffect, useState } from "react";
import { trpc } from "../trpc";
import EmployeeTable from "./EmployeeTable";
import { Form, InputGroup } from "react-bootstrap";

const EmployeesList: React.FC = () => {
    const [refreshPage, setRefreshPage] = useState(false);

    const [filterInput, setFilterInput] = useState("");

    const employees =
        trpc.employee.getEmployeesWithNameFilter.useQuery(filterInput);

    useEffect(() => {
        employees.refetch();
    }, [refreshPage]);

    return (
        <div>
            <h1>Employees List:</h1>
            <br />
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
            <br />

            <EmployeeTable
                state={employees.data}
                isAddEmployeeByttonHiden={false}
                setRefreshPage={() => setRefreshPage(!refreshPage)}
            />
        </div>
    );
};

export default EmployeesList;
