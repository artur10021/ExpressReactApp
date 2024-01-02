import React, { useEffect, useState } from "react";
import { EmployeeI } from "../types/EmployeeI";
import { trpc } from "../trpc";
import DepartmentTable from "./DepartmentTable";
import { Button, Modal } from "react-bootstrap";
import { DepartmentI } from "../types/DepartmentI";

const DepartmentList: React.FC = () => {
    const [departments, setDepartments] = useState<DepartmentI[]>([]);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        trpc.department.getDepartments.query().then((depArr) => {
            setDepartments(depArr);
        });
    }, [refreshPage]);

    return (
        <div>
            <h1>Department List:</h1>
            <DepartmentTable
                setRefreshPage={() => {
                    setRefreshPage(!refreshPage);
                }}
                departments={departments}
                isAddDepartmentButtonHidden={false}
            />
        </div>
    );
};

export default DepartmentList;
