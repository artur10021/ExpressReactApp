import React, { useEffect, useState } from "react";
import { EmployeeI } from "../types/EmployeeI";
import { trpc } from "../trpc";
import DepartmentTable from "./DepartmentTable";
import { Button, Modal } from "react-bootstrap";

const DepartmentList: React.FC = () => {
    const [isAddDepartmentButtonHidden, setIsAddDepartmentButtonHidden] =
        useState(false);

    return (
        <div>
            <h1>Department List:</h1>
            <DepartmentTable isAddDepartmentButtonHidden={false} />
        </div>
    );
};

export default DepartmentList;
