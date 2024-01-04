import React, { useEffect, useState } from "react";
import { trpc } from "../trpc";
import DepartmentTable from "./DepartmentTable";

const DepartmentList: React.FC = () => {
    const [refreshPage, setRefreshPage] = useState(false);

    const departments = trpc.department.getDepartments.useQuery();

    useEffect(() => {
        departments.refetch();
    }, [refreshPage]);

    return (
        <div>
            <h1>Department List:</h1>
            <DepartmentTable
                setRefreshPage={() => {
                    setRefreshPage(!refreshPage);
                }}
                departments={departments.data}
                isAddDepartmentButtonHidden={false}
            />
        </div>
    );
};

export default DepartmentList;
